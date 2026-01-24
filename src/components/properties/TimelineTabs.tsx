/**
 * TimelineTabs Component
 * ======================
 * Interactive timeline showing process steps for different inquiry types.
 * Tabs switch between Investment Inquiries and Property Submissions.
 * 
 * @see GrowthWave_Properties_Website_Copy_MASTER.md
 */
import { useState } from 'react';

// Brand Colors
const colors = {
  coral: '#FF6B4A',
  coralBg: 'rgba(255,107,74,0.15)',
  ocean: '#265077',
  oceanBg: 'rgba(38,80,119,0.12)',
  midnight: '#022140',
  cyan: '#51A7F8',
  cyanBg: 'rgba(81,167,248,0.12)',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray300: '#d1d5db',
  gray500: '#6b7280',
  gray600: '#4b5563',
};

// Timeline Step Icons
const Icons = {
  CheckCircle: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  Search: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Home: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
};

type TimelineTab = 'investment' | 'property';

interface TimelineStep {
  icon: keyof typeof Icons;
  title: string;
  time: string;
  desc: string;
}

const timelineData: Record<TimelineTab, TimelineStep[]> = {
  investment: [
    { 
      icon: 'CheckCircle', 
      title: 'Initial Response', 
      time: '24 hours', 
      desc: "We'll confirm receipt and schedule a consultation if you haven't already." 
    },
    { 
      icon: 'Users', 
      title: 'Discovery Call', 
      time: '30 minutes', 
      desc: 'Discuss your investment goals, our current opportunities, and answer questions.' 
    },
    { 
      icon: 'FileText', 
      title: 'Information Sharing', 
      time: 'Upon qualification', 
      desc: 'Qualified investors receive detailed property analysis and offering materials.' 
    },
    { 
      icon: 'Search', 
      title: 'Due Diligence', 
      time: 'Your pace', 
      desc: 'Review documents, ask questions, visit properties (encouraged).' 
    },
    { 
      icon: 'Home', 
      title: 'Investment Decision', 
      time: 'When ready', 
      desc: 'Move forward when comfortable with opportunity and terms.' 
    },
  ],
  property: [
    { 
      icon: 'CheckCircle', 
      title: 'Initial Review', 
      time: '2-3 business days', 
      desc: 'Our acquisition team reviews your submission against our criteria.' 
    },
    { 
      icon: 'Users', 
      title: 'Follow-up Questions', 
      time: 'If needed', 
      desc: "We'll reach out if we need additional information." 
    },
    { 
      icon: 'FileText', 
      title: 'Detailed Analysis', 
      time: 'If criteria match', 
      desc: 'Properties meeting criteria receive comprehensive underwriting.' 
    },
    { 
      icon: 'Home', 
      title: 'LOI/Offer', 
      time: 'Upon approval', 
      desc: 'Qualified properties receive a Letter of Intent.' 
    },
  ],
};

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState<TimelineTab>('investment');
  
  const steps = timelineData[activeTab];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-8 lg:mb-10">
        <button 
          className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base font-semibold border-2 transition-all"
          style={{ 
            backgroundColor: activeTab === 'investment' ? colors.coral : 'white', 
            borderColor: activeTab === 'investment' ? colors.coral : colors.gray300,
            color: activeTab === 'investment' ? 'white' : colors.gray600 
          }}
          onClick={() => setActiveTab('investment')}
        >
          Investment Inquiries
        </button>
        <button 
          className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base font-semibold border-2 transition-all"
          style={{ 
            backgroundColor: activeTab === 'property' ? colors.coral : 'white', 
            borderColor: activeTab === 'property' ? colors.coral : colors.gray300,
            color: activeTab === 'property' ? 'white' : colors.gray600 
          }}
          onClick={() => setActiveTab('property')}
        >
          Property Submissions
        </button>
      </div>
      
      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Connection line */}
        <div 
          className="absolute left-[27px] lg:left-[31px] top-4 bottom-4 w-0.5 hidden md:block"
          style={{ backgroundColor: `${colors.coral}30` }}
        />
        
        <div className="space-y-4">
          {steps.map((step, i) => {
            const IconComponent = Icons[step.icon];
            return (
              <div key={`${activeTab}-${i}`} className="flex gap-4 items-start">
                {/* Step indicator */}
                <div 
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shrink-0 relative z-10 transition-colors"
                  style={{ 
                    backgroundColor: i === 0 ? colors.coral : colors.gray100,
                    color: i === 0 ? 'white' : colors.ocean 
                  }}
                >
                  <IconComponent />
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-4 lg:p-5 border border-gray-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h4 
                      className="font-bold text-sm lg:text-base"
                      style={{ color: colors.midnight }}
                    >
                      {step.title}
                    </h4>
                    <span 
                      className="text-xs lg:text-sm font-medium px-2 py-0.5 rounded-full w-fit"
                      style={{ backgroundColor: colors.cyanBg, color: colors.cyan }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p 
                    className="text-sm lg:text-base"
                    style={{ color: colors.gray600 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
