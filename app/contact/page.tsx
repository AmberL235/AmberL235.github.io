'use client';

import { useState, useEffect } from 'react';
import CurrentYear from '@/components/CurrentYear';

export default function Contact() {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    <main className="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
      <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Back link */}
          <a
            href="/"
            className="text-sm font-semibold text-stone-500 transition hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
          >
            ← Back to Portfolio
          </a>

          {/* Light/Dark Mode Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-16 items-center justify-center rounded-full border border-stone-300 bg-white text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            aria-label="Toggle dark mode"
          >
            <span className="inline-block w-5 text-center">
              {mounted ? (darkMode ? '☀️' : '🌙') : ''}
            </span>
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-5xl font-extrabold tracking-tighter text-stone-900 md:text-7xl dark:text-stone-100">Get in Touch</h1>
        <p className="mt-6 text-lg text-stone-600 dark:text-stone-400">
          Have a question about my work or want to discuss a professional opportunity? Drop me a message below.
        </p>

        {status === 'SUCCESS' ? (
          <div className="mt-12 rounded-2xl bg-emerald-50 p-8 border border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200">
            <h3 className="text-xl font-bold">Message sent!</h3>
            <p className="mt-2">Thanks for reaching out, I will get back to you soon!</p>
            <button onClick={() => setStatus('IDLE')} className="mt-4 underline text-sm">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="full-name" className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Name</label>
              <input 
                type="text" name="name" id="full-name" required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 outline-none transition dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
                placeholder="Jane Doe"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Email Address</label>
              <input 
                type="email" name="_replyto" id="email" required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 outline-none transition dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
                placeholder="jane@example.com"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Message</label>
              <textarea 
                id="message" name="message" rows={5} required
                className="rounded-xl border border-stone-200 p-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 outline-none transition dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500"
                placeholder="Hi Amber, I'd like to discuss..."
              />
            </div>

            {/* Hidden gotcha field for spam prevention */}
            <input type="text" name="_gotcha" style={{display: 'none'}} />

            <button 
              type="submit" 
              disabled={status === 'SUBMITTING'}
              className="rounded-full bg-stone-900 py-4 font-bold text-white transition hover:bg-stone-800 disabled:bg-stone-400 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-700"
            >
              {status === 'SUBMITTING' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'ERROR' && (
              <p className="text-rose-600 dark:text-blue-600 text-sm font-medium">Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}