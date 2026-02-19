/**
 * ContactForm Component
 * =====================
 * Smart contact form with conditional fields based on inquiry type.
 * Submits to Go High Level CRM via Properties Contact form.
 *
 * GHL Integration (AdvisorHub by Impruvu):
 * - Properties Contact Form ID: 7kpPe28E6X4uw0cu1zjd
 * - Location ID: dJsBnS06sWTWcGSn1Mjp
 * - Submission URL: https://crm.advisorhub.io/forms/submit
 * - Custom fields mapped via GHL_FIELD_MAP → "Form | Properties Contact" folder
 *
 * Conditional Fields:
 * - Investment Opportunities: accredited status, timeline, amount
 * - Property Submission: location, units, price, relationship
 * - Partnership/JV: interest description
 *
 * URL Parameter Support:
 * - /contact?type=investment   → Preselects "Investment Opportunities"
 * - /contact?type=partnership  → Preselects "Partnership/JV Inquiries"
 * - /contact?type=property     → Preselects "Property Submission"
 * - /contact?type=general      → Preselects "General Questions"
 * - /contact?type=media        → Preselects "Media/Press Inquiries"
 *
 * @see GrowthWave_Properties_Website_Copy_MASTER.md
 */
import { useState, useEffect, type FormEvent } from 'react';

// Brand Colors
const colors = {
  coral: '#FF6B4A',
  coralBg: 'rgba(255,107,74,0.08)',
  ocean: '#265077',
  oceanBg: 'rgba(38,80,119,0.08)',
  midnight: '#022140',
  cyan: '#51A7F8',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
};

type InquiryType = '' | 'investment' | 'property' | 'partnership' | 'general' | 'media';

// Valid inquiry types for URL parameter validation
const validInquiryTypes: InquiryType[] = ['investment', 'property', 'partnership', 'general', 'media'];

// GHL Integration Constants
const GHL_FORM_ID = '7kpPe28E6X4uw0cu1zjd';
const GHL_LOCATION_ID = 'dJsBnS06sWTWcGSn1Mjp';
const GHL_SUBMIT_URL = 'https://crm.advisorhub.io/forms/submit';

// Map React form field names → GHL custom field keys
// These keys match GHL Custom Fields in "Form | Properties Contact" folder
const GHL_FIELD_MAP: Record<string, string> = {
  inquiryType: 'contact.inquiry_type',
  message: 'contact.message',
  referralSource: 'contact.referral_source',
  accredited: 'contact.accredited_investor',
  investmentTimeline: 'contact.investment_timeline',
  investmentAmount: 'contact.investment_amount',
  propertyLocation: 'contact.property_location',
  unitCount: 'contact.unit_count',
  askingPrice: 'contact.asking_price',
  propertyRelationship: 'contact.property_relationship',
  partnershipInterest: 'contact.partnership_interest',
};

// Inquiry type short values → GHL-friendly labels
const INQUIRY_LABELS: Record<string, string> = {
  investment: 'Investment Opportunities',
  property: 'Property Submission',
  partnership: 'Partnership / JV Inquiries',
  general: 'General Questions',
  media: 'Media / Press Inquiries',
};

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAccreditedInfo, setShowAccreditedInfo] = useState(false);

  // Read URL parameter on mount and preselect inquiry type
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type') as InquiryType;
    
    if (typeParam && validInquiryTypes.includes(typeParam)) {
      setInquiryType(typeParam);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Build GHL submission payload
    // Standard GHL contact fields
    const payload: Record<string, string> = {
      formId: GHL_FORM_ID,
      location_id: GHL_LOCATION_ID,
      first_name: (formData.get('firstName') as string) || '',
      last_name: (formData.get('lastName') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
    };

    // Map custom fields through GHL_FIELD_MAP
    for (const [formName, ghlKey] of Object.entries(GHL_FIELD_MAP)) {
      let value = formData.get(formName) as string;
      if (value) {
        // Convert inquiry type short value to GHL label
        if (formName === 'inquiryType' && INQUIRY_LABELS[value]) {
          value = INQUIRY_LABELS[value];
        }
        payload[ghlKey] = value;
      }
    }

    // Add source tag for tracking
    payload['source'] = 'website-properties-contact';
    payload['tags'] = 'source:website-organic';

    try {
      // Submit to GHL CRM — Properties Contact form
      // Uses no-cors mode (GHL returns opaque response for cross-origin)
      await fetch(GHL_SUBMIT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      // GHL no-cors always resolves — show success
      setFormSubmitted(true);
    } catch (err) {
      console.warn('GHL form submission error:', err);
      // Still show success — GHL may have received the data
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (formSubmitted) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3
          className="text-xl lg:text-2xl font-bold mb-3"
          style={{ color: colors.midnight }}
        >
          Message Received!
        </h3>
        <p className="text-base lg:text-lg mb-4" style={{ color: colors.gray600 }}>
          We'll respond within one business day—usually much faster.
        </p>
        <p className="text-sm italic" style={{ color: colors.gray500 }}>
          {inquiryType === 'investment'
            ? 'Our investment team will reach out with next steps.'
            : inquiryType === 'property'
              ? 'Our acquisitions team will review your submission promptly.'
              : inquiryType === 'partnership'
                ? 'Looking forward to exploring partnership opportunities with you.'
                : 'Thank you for reaching out to GrowthWave Properties.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Inquiry Type - Primary Selector */}
      <div>
        <label 
          className="block text-sm lg:text-base font-medium mb-2"
          style={{ color: colors.midnight }}
        >
          I'm interested in: <span style={{ color: colors.coral }}>*</span>
        </label>
        <div className="relative">
          <select 
            name="inquiryType"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 appearance-none bg-white text-sm lg:text-base focus:outline-none focus:ring-2"
            style={{ 
              color: inquiryType ? colors.midnight : colors.gray500,
              // @ts-ignore - CSS custom property
              '--tw-ring-color': colors.coral 
            }}
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value as InquiryType)}
          >
            <option value="">Select an option...</option>
            <option value="investment">Investment Opportunities</option>
            <option value="property">Property Submission (Brokers/Sellers)</option>
            <option value="partnership">Partnership/JV Inquiries</option>
            <option value="general">General Questions</option>
            <option value="media">Media/Press Inquiries</option>
          </select>
          <span 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: colors.gray400 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
      
      {/* Conditional Fields - Investment */}
      {inquiryType === 'investment' && (
        <div 
          className="space-y-4 p-4 rounded-lg border"
          style={{ backgroundColor: colors.coralBg, borderColor: 'transparent' }}
        >
          <div>
            <label 
              className="block text-sm lg:text-base font-medium mb-2 flex items-center gap-1"
              style={{ color: colors.midnight }}
            >
              Are you an accredited investor?
              <button 
                type="button" 
                className="inline-flex hover:opacity-70 transition-opacity"
                onClick={() => setShowAccreditedInfo(!showAccreditedInfo)}
                title="View definition"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.cyan }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </button>
            </label>
            
            {/* Accredited Investor Definition Tooltip */}
            {showAccreditedInfo && (
              <div 
                className="mb-3 p-3 rounded-lg text-xs lg:text-sm"
                style={{ backgroundColor: `${colors.cyan}15`, color: colors.ocean }}
              >
                <strong>Accredited Investor Definition:</strong> Must meet one of: (1) Annual income of $200,000+ individually ($300,000+ joint) for past 2 years, (2) Net worth exceeding $1,000,000 (excluding primary residence), or (3) Valid Series 7, 65, or 82 license.
              </div>
            )}
            
            <div className="flex gap-4 flex-wrap">
              {['Yes', 'No', 'Not sure yet'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accredited"
                    value={opt}
                    className="w-4 h-4"
                    style={{ accentColor: colors.coral }}
                  />
                  <span className="text-sm lg:text-base" style={{ color: colors.gray600 }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label 
              className="block text-sm lg:text-base font-medium mb-2"
              style={{ color: colors.midnight }}
            >
              When are you looking to invest?
            </label>
            <select 
              name="investmentTimeline"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
            >
              <option value="Immediately">Immediately</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>
          
          <div>
            <label 
              className="block text-sm lg:text-base font-medium mb-2"
              style={{ color: colors.midnight }}
            >
              Investment amount you're considering?
            </label>
            <select 
              name="investmentAmount"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
            >
              <option value="$50K - $100K">$50K - $100K</option>
              <option value="$100K - $250K">$100K - $250K</option>
              <option value="$250K - $500K">$250K - $500K</option>
              <option value="$500K+">$500K+</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Conditional Fields - Property Submission */}
      {inquiryType === 'property' && (
        <div 
          className="space-y-4 p-4 rounded-lg border"
          style={{ backgroundColor: colors.oceanBg, borderColor: 'transparent' }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm lg:text-base font-medium mb-2"
                style={{ color: colors.midnight }}
              >
                Property Location
              </label>
              <input 
                type="text" 
                name="propertyLocation"
                placeholder="City, State" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': colors.ocean } as React.CSSProperties}
              />
            </div>
            <div>
              <label 
                className="block text-sm lg:text-base font-medium mb-2"
                style={{ color: colors.midnight }}
              >
                Number of Units
              </label>
              <input 
                type="number" 
                name="unitCount"
                placeholder="e.g., 12" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': colors.ocean } as React.CSSProperties}
              />
            </div>
          </div>
          <div>
            <label 
              className="block text-sm lg:text-base font-medium mb-2"
              style={{ color: colors.midnight }}
            >
              Asking Price (if listed)
            </label>
            <input 
              type="text" 
              name="askingPrice"
              placeholder="e.g., $1,200,000" 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': colors.ocean } as React.CSSProperties}
            />
          </div>
          <div>
            <label 
              className="block text-sm lg:text-base font-medium mb-2"
              style={{ color: colors.midnight }}
            >
              Your relationship to property
            </label>
            <select 
              name="propertyRelationship"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': colors.ocean } as React.CSSProperties}
            >
              <option value="Broker">Broker</option>
              <option value="Owner">Owner</option>
              <option value="Off-market source">Off-market source</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Conditional Fields - Partnership */}
      {inquiryType === 'partnership' && (
        <div 
          className="p-4 rounded-lg border"
          style={{ backgroundColor: colors.coralBg, borderColor: 'transparent' }}
        >
          <label 
            className="block text-sm lg:text-base font-medium mb-2"
            style={{ color: colors.midnight }}
          >
            Tell us about your partnership interest
          </label>
          <textarea 
            name="partnershipInterest"
            rows={3}
            placeholder="Describe your background, investment experience, and what type of partnership you're interested in..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base resize-none focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
          />
        </div>
      )}
      
      {/* Universal Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            className="block text-sm lg:text-base font-medium mb-2"
            style={{ color: colors.midnight }}
          >
            First Name <span style={{ color: colors.coral }}>*</span>
          </label>
          <input 
            type="text"
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
          />
        </div>
        <div>
          <label 
            className="block text-sm lg:text-base font-medium mb-2"
            style={{ color: colors.midnight }}
          >
            Last Name <span style={{ color: colors.coral }}>*</span>
          </label>
          <input 
            type="text"
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
          />
        </div>
      </div>
      
      <div>
        <label 
          className="block text-sm lg:text-base font-medium mb-2"
          style={{ color: colors.midnight }}
        >
          Email Address <span style={{ color: colors.coral }}>*</span>
        </label>
        <input 
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
        />
      </div>
      
      <div>
        <label 
          className="block text-sm lg:text-base font-medium mb-2"
          style={{ color: colors.midnight }}
        >
          Phone Number{' '}
          <span className="text-xs lg:text-sm font-normal" style={{ color: colors.gray500 }}>
            (optional but recommended)
          </span>
        </label>
        <input 
          type="tel"
          name="phone"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
        />
      </div>
      
      <div>
        <label 
          className="block text-sm lg:text-base font-medium mb-2"
          style={{ color: colors.midnight }}
        >
          How did you hear about us?
        </label>
        <select 
          name="referralSource"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
        >
          <option value="">Select...</option>
          <option value="Google">Google Search</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Professional Community">Professional Community</option>
          <option value="2nd Mountain Climbers">2nd Mountain Climbers</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label 
          className="block text-sm lg:text-base font-medium mb-2"
          style={{ color: colors.midnight }}
        >
          Your Message
        </label>
        <textarea 
          name="message"
          rows={4}
          placeholder="Tell us about your investment goals or questions..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm lg:text-base resize-none focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': colors.coral } as React.CSSProperties}
        />
      </div>
      
      {/* Non-Marketing SMS Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="smsConsent"
          className="w-4 h-4 mt-0.5 rounded"
          style={{ accentColor: colors.coral }}
        />
        <span className="text-sm lg:text-base" style={{ color: colors.gray600 }}>
          By checking this box, you agree to receive text messages from GrowthWave Advisors LLC. Message frequency varies. Message and data rates may apply. Text STOP to opt out or HELP for help.
        </span>
      </label>

      {/* Marketing Opt-in */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="marketingOptIn"
          className="w-4 h-4 mt-0.5 rounded"
          style={{ accentColor: colors.coral }}
        />
        <span className="text-sm lg:text-base" style={{ color: colors.gray600 }}>
          I consent to receive marketing text messages from GrowthWave Advisors LLC at the phone number provided. Message frequency varies. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
        </span>
      </label>
      
      {/* Submit Button */}
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: colors.ocean }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
