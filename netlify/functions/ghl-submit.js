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

  // Pre-qual form: funding goal
  if (data.fundingGoal) {
    customFields.push({
      id: "funding_goal",
      field_value: data.fundingGoal,
    });
  }

  // Pre-qual form: credit score range
  if (data.creditScore) {
    customFields.push({
      id: "credit_score",
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
    // STEP 2: Enroll in Workflow (future)
    // ============================================
    // Uncomment and populate workflow IDs when ready:
    //
    // const FORM_WORKFLOWS = {
    //   contact: "workflow-id-for-contact",
    //   prequal: "workflow-id-for-prequal",
    //   guide: "workflow-id-for-guide-nurture",
    // };
    //
    // const workflowId = FORM_WORKFLOWS[formType];
    // if (contactId && workflowId) {
    //   try {
    //     await fetch(
    //       `${GHL_API_BASE}/contacts/${contactId}/workflow/${workflowId}`,
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${apiToken}`,
    //           Version: GHL_API_VERSION,
    //         },
    //       }
    //     );
    //     console.log(`Enrolled ${contactId} in workflow ${workflowId}`);
    //   } catch (wfErr) {
    //     console.warn("Workflow enrollment failed (non-blocking):", wfErr);
    //   }
    // }

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
