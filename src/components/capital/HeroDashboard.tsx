/**
 * HeroDashboard.tsx — GrowthWave Capital Hero Visual
 * ====================================================
 * Production React island component for the Capital homepage hero.
 * 
 * Usage in Astro:
 *   import HeroDashboard from '@components/capital/HeroDashboard';
 *   <HeroDashboard client:visible />
 * 
 * Design System:
 * - Royal Purple #7C3AED accent
 * - Glass-morphism cards matching site-wide pattern
 * - Animated on mount (numbers count up, elements stagger in)
 * - No external dependencies beyond React
 * 
 * @brand capital
 * @updated February 2026
 */
import { useState, useEffect } from 'react';

// ─── Brand Tokens ─────────────────────────────────────
const PURPLE      = '#7C3AED';
const PURPLE_LIGHT = '#8B5CF6';
const PURPLE_GLOW  = 'rgba(124,58,237,0.35)';
const GREEN        = '#10B981';
const CYAN         = '#51A7F8';

// ─── Animated Number Counter ──────────────────────────
function AnimatedNumber({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
  delay = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return <>{`${prefix}${value.toLocaleString()}${suffix}`}</>;
}

// ─── Pulse Status Dot ─────────────────────────────────
function StatusDot({ color, pulseDelay = 0 }: { color: string; pulseDelay?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
      <span
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.6,
          animation: `gw-ping 2s cubic-bezier(0,0,0.2,1) infinite`,
          animationDelay: `${pulseDelay}ms`,
        }}
      />
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
    </span>
  );
}

// ─── Pipeline Step ────────────────────────────────────
function PipelineStep({
  label,
  isActive,
  isComplete,
  isLast,
  delay,
}: {
  label: string;
  isActive?: boolean;
  isComplete?: boolean;
  isLast?: boolean;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const dotColor = isComplete ? GREEN : isActive ? PURPLE_LIGHT : 'rgba(255,255,255,0.2)';
  const lineColor = isComplete ? GREEN : 'rgba(255,255,255,0.1)';
  const textColor = isComplete
    ? 'rgba(255,255,255,0.9)'
    : isActive
    ? '#fff'
    : 'rgba(255,255,255,0.4)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: isActive ? 22 : 16,
            height: isActive ? 22 : 16,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isActive ? 'rgba(124,58,237,0.25)' : 'transparent',
            border: `2px solid ${dotColor}`,
            transition: 'all 0.4s ease',
            boxShadow: isActive ? `0 0 12px ${PURPLE_GLOW}` : 'none',
          }}
        >
          {isComplete ? (
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 4" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : isActive ? (
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: PURPLE_LIGHT }} />
          ) : null}
        </div>
        {!isLast && (
          <div
            style={{
              width: 20,
              height: 2,
              backgroundColor: lineColor,
              transition: 'background-color 0.5s ease',
            }}
          />
        )}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          color: textColor,
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Lender Match Row (animated) ──────────────────────
function MatchRow({
  name,
  amount,
  rate,
  score,
  color,
  delay,
  isLast,
}: {
  name: string;
  amount: string;
  rate: string;
  score: number;
  color: string;
  delay: number;
  isLast: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: !isLast ? '1px solid rgba(255,255,255,0.05)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-8px)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${color}15`,
            border: `1px solid ${color}30`,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color }}>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 500, lineHeight: 1.2 }}>{name}</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, lineHeight: 1.3 }}>{rate}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{amount}</span>
        <div
          style={{
            background: `${color}15`,
            borderRadius: 4,
            padding: '2px 6px',
          }}
        >
          <span style={{ color, fontSize: 10, fontWeight: 600 }}>{score}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Glass card base styles ───────────────────────────
const glassBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
};

const glassCard: React.CSSProperties = {
  ...glassBase,
  borderRadius: 14,
  padding: '16px 18px',
};

// ─── Main Component ───────────────────────────────────
export default function HeroDashboard() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const lenderMatches = [
    { name: 'Business LOC', amount: '$75K', rate: 'Prime + 2%', score: 94, color: GREEN },
    { name: 'Credit Stack', amount: '$50K', rate: '0% Intro', score: 91, color: PURPLE_LIGHT },
    { name: 'DSCR Bridge', amount: '$50K', rate: '8.2%', score: 87, color: CYAN },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
        fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Purple ambient glow behind the card */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          width: 250,
          height: 250,
          background: `radial-gradient(circle, ${PURPLE_GLOW} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Main dashboard frame */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            ...glassBase,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.06),
              0 25px 60px -12px rgba(0,0,0,0.5),
              0 0 80px -20px ${PURPLE_GLOW}
            `,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 6,
                padding: '3px 10px',
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.02em',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
                <path d="M12 2a10 10 0 110 20 10 10 0 010-20z" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              app.growthwavecapital.com
            </div>
            <div style={{ width: 44 }} />
          </div>

          {/* Dashboard content */}
          <div style={{ padding: '18px 18px 20px' }}>
            {/* User + status row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_LIGHT} 100%)`,
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  JR
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>
                    James Rivera
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.3 }}>
                    Real Estate Investor
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: 20,
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 500,
                  color: GREEN,
                }}
              >
                <StatusDot color={GREEN} />
                Pre-Qualified
              </div>
            </div>

            {/* Funding capacity card */}
            <div
              style={{
                ...glassCard,
                marginBottom: 14,
                background: `linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 100%)`,
                border: '1px solid rgba(124,58,237,0.18)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Estimated Funding Capacity
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: PURPLE_LIGHT, opacity: 0.7 }}>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedNumber target={175} prefix="$" suffix="K" duration={2000} delay={600} />
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: GREEN,
                    background: 'rgba(16,185,129,0.12)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  3 matches
                </span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 6 }}>
                Business Credit + LOC + DSCR Blend
              </div>
            </div>

            {/* Pipeline progress */}
            <div style={{ ...glassCard, marginBottom: 14, padding: '14px 16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Application Pipeline
                </span>
                <span style={{ color: PURPLE_LIGHT, fontSize: 11, fontWeight: 500 }}>Step 3 of 5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: 4 }}>
                <PipelineStep label="Pre-Qual" isComplete delay={800} />
                <PipelineStep label="Docs" isComplete delay={1000} />
                <PipelineStep label="Matching" isActive delay={1200} />
                <PipelineStep label="Review" delay={1400} />
                <PipelineStep label="Funded" isLast delay={1600} />
              </div>
            </div>

            {/* Lender matches */}
            <div style={{ ...glassCard, padding: '14px 16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Lender Matches
                </span>
                <StatusDot color={PURPLE_LIGHT} pulseDelay={400} />
              </div>
              {lenderMatches.map((match, i) => (
                <MatchRow
                  key={match.name}
                  {...match}
                  delay={1400 + i * 200}
                  isLast={i === lenderMatches.length - 1}
                />
              ))}
            </div>

            {/* CTA button */}
            <div
              style={{
                marginTop: 14,
                padding: 10,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_LIGHT} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: `0 4px 20px ${PURPLE_GLOW}`,
              }}
            >
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.01em' }}>
                View Full Analysis
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: '#fff' }}>
                <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating notification — top right ── */}
      <div
        style={{
          position: 'absolute',
          top: -12,
          right: -28,
          ...glassBase,
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 40px ${PURPLE_GLOW}`,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.9)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 1.8s',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(16,185,129,0.15)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: GREEN }}>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>
            New Match Found
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, lineHeight: 1.3 }}>
            DSCR Lender — 87% fit
          </div>
        </div>
      </div>

      {/* ── Floating stat — bottom left ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: -20,
          ...glassBase,
          borderRadius: 10,
          padding: '10px 14px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 2.2s',
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 10,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 2,
          }}
        >
          Avg. Funding Time
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            <AnimatedNumber target={18} duration={1500} delay={2400} />
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 500 }}>days</span>
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes gw-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
