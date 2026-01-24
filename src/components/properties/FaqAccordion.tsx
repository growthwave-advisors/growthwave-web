/**
 * FaqAccordion Component
 * ======================
 * Expandable FAQ section with accordion behavior.
 * Only one item can be expanded at a time.
 * 
 * @see GrowthWave_Properties_Website_Copy_MASTER.md
 */
import { useState } from 'react';

// Brand Colors
const colors = {
  coral: '#FF6B4A',
  lightGray: '#718EA7',
};

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div 
          key={i}
          className="rounded-xl overflow-hidden border transition-colors"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderColor: expandedIndex === i ? `${colors.coral}50` : 'rgba(255,255,255,0.1)'
          }}
        >
          <button
            type="button"
            className="w-full px-5 lg:px-6 py-4 lg:py-5 flex items-center justify-between text-left"
            onClick={() => toggleFaq(i)}
            aria-expanded={expandedIndex === i}
          >
            <span className="font-semibold text-sm lg:text-base text-white pr-4">
              {faq.question}
            </span>
            <span 
              className="shrink-0 transform transition-transform duration-200"
              style={{ 
                color: colors.coral,
                transform: expandedIndex === i ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          
          {/* Expandable content */}
          <div 
            className="overflow-hidden transition-all duration-200"
            style={{ 
              maxHeight: expandedIndex === i ? '500px' : '0',
              opacity: expandedIndex === i ? 1 : 0
            }}
          >
            <div className="px-5 lg:px-6 pb-4 lg:pb-5">
              <p 
                className="text-sm lg:text-base leading-relaxed"
                style={{ color: colors.lightGray }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
