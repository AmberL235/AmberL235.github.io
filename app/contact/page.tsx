'use client';

import { useState } from 'react';
import CurrentYear from '@/components/CurrentYear';

export default function Contact() {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('SUBMITTING');

    const formData = new FormData(e.currentTarget);
    const response = await fetch('https://formspree.io/f/myklkagd', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      setStatus('SUCCESS');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('ERROR');
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      <nav className="border-b border-stone-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6">
          <a href="/" className="text-sm font-semibold text-stone-500 hover:text-stone-800 transition">
            ← Back to Portfolio
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-5xl font-extrabold tracking-tighter text-stone-900 md:text-7xl">Get in Touch</h1>
        <p className="mt-6 text-lg text-stone-600">
          Have a question about my work or want to discuss a professional opportunity? Drop me a message below.
        </p>

        {status === 'SUCCESS' ? (
          <div className="mt-12 rounded-2xl bg-emerald-50 p-8 border border-emerald-200 text-emerald-800">
            <h3 className="text-xl font-bold">Message sent!</h3>
            <p className="mt-2">Thanks for reaching out, I will get back to you soon!</p>
            <button onClick={() => setStatus('IDLE')} className="mt-4 underline text-sm">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="full-name" className="text-sm font-bold uppercase tracking-widest text-stone-500">Name</label>
              <input 
                type="text" name="name" id="full-name" required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                placeholder="Jane Doe"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-stone-500">Email Address</label>
              <input 
                type="email" name="_replyto" id="email" required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                placeholder="jane@example.com"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-stone-500">Message</label>
              <textarea 
                id="message" name="message" rows={5} required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                placeholder="Hi Amber, I'd like to discuss..."
              />
            </div>

            {/* Hidden gotcha field for spam prevention */}
            <input type="text" name="_gotcha" style={{display: 'none'}} />

            <button 
              type="submit" 
              disabled={status === 'SUBMITTING'}
              className="rounded-full bg-stone-900 py-4 font-bold text-white transition hover:bg-stone-800 disabled:bg-stone-400"
            >
              {status === 'SUBMITTING' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'ERROR' && (
              <p className="text-rose-600 text-sm font-medium">Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}