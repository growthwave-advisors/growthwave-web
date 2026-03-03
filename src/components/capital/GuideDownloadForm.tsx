/**
 * GuideDownloadForm — Credit Sculpt Series Vol. 1 download form
 * ---------------------------------------------------------------
 * Posts to /.netlify/functions/ghl-submit with formType "guide".
 * Delivery is via GHL email automation (guide sent to inbox).
 * No pipelineStage — not supported by ghl-submit function.
 * No Turnstile widget — server-side bot guards in ghl-submit apply.
 */
import { useState } from 'react';

export default function GuideDownloadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value.trim();
    const lastName  = (form.elements.namedItem('lastName')  as HTMLInputElement).value.trim();
    const email     = (form.elements.namedItem('email')     as HTMLInputElement).value.trim();

    if (!firstName || !email) return;

    setStatus('submitting');

    try {
      const res = await fetch('/.netlify/functions/ghl-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'guide',
          firstName,
          lastName,
          email,
          website: '', // honeypot — always blank from real users
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
      } else {
        console.error('GuideDownloadForm submit error:', result);
        setStatus('error');
      }
    } catch (err) {
      console.error('GuideDownloadForm fetch failed:', err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4" style={{ color: '#10B981' }}>✓</div>
        <p className="text-lg font-semibold" style={{ color: '#022140' }}>
          Check your inbox &mdash; Vol. 1 is on its way.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Add <strong>info@growthwavecapital.com</strong> to your contacts so it doesn&rsquo;t land in spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span aria-hidden="true">*</span>
          </label>
          <input
            name="firstName"
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span aria-hidden="true">*</span>
          </label>
          <input
            name="lastName"
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span aria-hidden="true">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#7C3AED' } as React.CSSProperties}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full text-white font-semibold py-4 rounded-lg transition-colors text-sm disabled:opacity-60"
        style={{ backgroundColor: status === 'submitting' ? '#6d28d9' : '#7C3AED' }}
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Send Me Vol. 1 \u2192'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600 text-center">
          Something went wrong. Email us at{' '}
          <a href="mailto:info@growthwavecapital.com" className="underline">
            info@growthwavecapital.com
          </a>
        </p>
      )}

      <p className="text-xs text-gray-400 text-center pt-2">
        No spam. No pitch. Unsubscribe anytime.
      </p>
    </form>
  );
}
