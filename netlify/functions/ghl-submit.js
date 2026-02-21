/**
 * GHL Form Submission — Netlify Serverless Function
 * ==================================================
 * Receives form data from the website, creates/updates a contact
 * in GoHighLevel via the official V2 API, and applies tags.
 *
 * FORMAT: Netlify Functions V1 (Lambda-compatible)
 * This uses the classic exports.handler pattern which Netlify
 * auto-detects reliably from the netlify/functions/ directory.
 *
 * Environment Variables (set in Netlify Dashboard):
 *   GHL_API_TOKEN   — Private Integration Token
 *   GHL_LOCATION_ID — Sub-account/location ID
 *
 * Endpoint: /.netlify/functions/ghl-submit
 * Method:   POST
 * Body:     JSON with form fields + formType
 *
 * CHANGELOG:
 *   2026-02-21 — Fixed custom field keys for pre-qual form:
 *                  funding_goal → funding_amount_needed
 *                  credit_score → estimated_credit_score_range
 *              — Activated workflow enrollment for prequal form type
 *                  Workflow: Capital — Unified Lead Nurture (All Entry Ramps)
 *                  ID: 52c79b90-0897-4bed-8dbd-4dc94ce2735a
 */

// ============================================
// CONFIGURATION
// ============================================

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

// Tag presets per form type
const FORM_TAGS = {
  contact: ["source:website-organic", "brand:capital", "form:capital-contact"],
  prequal: [
    "source:website-organic",
    "brand:capital",
    "form:capital-prequal",
    "engagement:prequal-submitted",
  ],
  guide: [
    "source:website-organic",
    "brand:capital",
    "form:capital-guide",
    "engagement:lead-magnet-downloaded",
  ],
};

// Source label per form type (shows in GHL contact record)
const FORM_SOURCES = {
  contact: "Website — Capital Contact",
  prequal: "Website — Capital Pre-Qualification",
  guide: "Website — Capital Guide Download",
};

// Workflow enrollment per form type.
// Only prequal is wired — contact and guide feed separate downstream paths.
// Add workflow IDs for those form types when those sequences are built.
const FORM_WORKFLOWS = {
  contact: null,
  prequal: "52c79b90-0897-4bed-8dbd-4dc94ce2735a", // Capital — Unified Lead Nurture (All Entry Ramps)
  guide: null,
};

// ============================================
// HANDLER (V1 Lambda format)
// ============================================

exports.handler = async function (event) {
  // CORS headers for preflight
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Only accept POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse request body
  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  // Validate required fields
  const { formType, firstName, lastName, email, phone } = data;

  if (!formType || !FORM_TAGS[formType]) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error:
          "Missing or invalid formType. Expected: contact, prequal, or guide",
      }),
    };
  }

  if (!email && !phone) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: "At least one of email or phone is required",
      }),
    };
  }

  // Load env vars
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiToken || !locationId) {
    console.error(
      "Missing GHL_API_TOKEN or GHL_LOCATION_ID environment variables"
    );
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  // ============================================
  // STEP 1: Upsert Contact
  // ============================================

  // Build custom fields array for form-specific fields
  const customFields = [];

  // Contact form: product interest dropdown
  if (data.productInterest) {
    customFields.push({
      id: "single_dropdown_89ki",
      field_value: data.productInterest,
    });
  }

  // Contact form: message
  if (data.message) {
    customFields.push({
      id: "multi_line_2fsn",
      field_value: data.message,
    });
  }

  // Pre-qual form: funding amount needed
  // GHL field key: funding_amount_needed (merge tag: {{ contact.funding_amount_needed }})
  if (data.fundingGoal) {
    customFields.push({
      id: "funding_amount_needed",
      field_value: data.fundingGoal,
    });
  }

  // Pre-qual form: estimated credit score range
  // GHL field key: estimated_credit_score_range (merge tag: {{ contact.estimated_credit_score_range }})
  if (data.creditScore) {
    customFields.push({
      id: "estimated_credit_score_range",
      field_value: data.creditScore,
    });
  }

  const upsertPayload = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phone: phone || "",
    locationId,
    tags: FORM_TAGS[formType],
    source: FORM_SOURCES[formType],
  };

  // Only include customFields if we have any
  if (customFields.length > 0) {
    upsertPayload.customFields = customFields;
  }

  try {
    const upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(upsertPayload),
    });

    if (!upsertRes.ok) {
      const errorBody = await upsertRes.text();
      console.error(
        `GHL upsert failed: ${upsertRes.status} ${upsertRes.statusText}`,
        errorBody
      );
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Failed to create contact in CRM",
          detail: upsertRes.status,
        }),
      };
    }

    const upsertData = await upsertRes.json();
    const contactId = upsertData?.contact?.id;

    console.log(
      `GHL contact upserted: ${contactId} (${formType}) — ${email || phone}`
    );

    // ============================================
    // STEP 2: Enroll in Workflow
    // ============================================
    // Enrolls the contact in the appropriate GHL workflow by form type.
    // Workflow enrollment is non-blocking — a failure here does not
    // prevent the contact from being created or the 200 response from
    // being returned to the front-end.

    const workflowId = FORM_WORKFLOWS[formType];

    if (contactId && workflowId) {
      try {
        const wfRes = await fetch(
          `${GHL_API_BASE}/contacts/${contactId}/workflow/${workflowId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiToken}`,
              Version: GHL_API_VERSION,
            },
          }
        );

        if (wfRes.ok) {
          console.log(
            `Enrolled ${contactId} in workflow ${workflowId} (${formType})`
          );
        } else {
          const wfError = await wfRes.text();
          console.warn(
            `Workflow enrollment returned ${wfRes.status} for ${contactId}:`,
            wfError
          );
        }
      } catch (wfErr) {
        // Non-blocking — contact was already created successfully
        console.warn(
          `Workflow enrollment request failed for ${contactId}:`,
          wfErr
        );
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, contactId, formType }),
    };
  } catch (err) {
    console.error("GHL API request failed:", err);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: "CRM API request failed" }),
    };
  }
};
