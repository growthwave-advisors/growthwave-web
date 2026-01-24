/**
 * ContactForm Component
 * =====================
 * Smart contact form with conditional fields based on inquiry type.
 * Integrates with Go High Level CRM.
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

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    // TODO: Integrate with Go High Level CRM
    // const formData = new FormData(e.currentTarget);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    alert('Thank you for your message! We\'ll be in touch within one business day.');
  };

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
              {['Yes', 'No', 'Not sure'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="accredited" 
                    value={opt.toLowerCase().replace(' ', '-')}
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
              <option value="immediately">Immediately</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="longer-term">Longer term</option>
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
              <option value="25k-50k">$25K - $50K</option>
              <option value="50k-100k">$50K - $100K</option>
              <option value="100k-250k">$100K - $250K</option>
              <option value="250k-plus">$250K+</option>
              <option value="evaluating">Still evaluating</option>
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
              <option value="broker">Broker</option>
              <option value="owner">Owner</option>
              <option value="off-market">Off-market source</option>
              <option value="other">Other</option>
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
          <option value="google">Google Search</option>
          <option value="linkedin">LinkedIn</option>
          <option value="referral">Referral</option>
          <option value="event">Real Estate Event</option>
          <option value="social">Social Media</option>
          <option value="other">Other</option>
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
      
      {/* Marketing Opt-in */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input 
          type="checkbox"
          name="marketingOptIn"
          className="w-4 h-4 mt-0.5 rounded" 
          style={{ accentColor: colors.coral }} 
        />
        <span className="text-sm lg:text-base" style={{ color: colors.gray600 }}>
          Yes, I'd like to receive updates about investment opportunities and market insights from GrowthWave Properties.
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
