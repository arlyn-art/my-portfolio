'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  FileText,
  ArrowRight,
  Check,
  Copy,
  Activity,
  Users,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  GitBranch,
} from 'lucide-react';

export default function CallToAction() {
  const [copied, setCopied] = useState(false);

  const email = 'arlynartapradipa9c@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-24 bg-white px-6 sm:px-8 border-t border-slate-100">
      {/* Keyframes animasi auto-scroll untuk Mac & iPhone */}
      <style jsx>{`
        @keyframes dashboardScroll {
          0%, 15% {
            transform: translateY(0%);
          }
          50%, 65% {
            transform: translateY(-42%);
          }
          85%, 100% {
            transform: translateY(0%);
          }
        }
        .animate-mac-scroll {
          animation: dashboardScroll 11s ease-in-out infinite;
        }
        .animate-iphone-scroll {
          animation: dashboardScroll 11s ease-in-out infinite;
          animation-delay: 1.2s;
        }
      `}</style>

      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 shadow-2xl shadow-slate-900/10">
          
          {/* Efek Dekoratif Gradient Halus */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* Sisi Kiri (6 Kolom): Status, Headline & Quick Contacts */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Full-time &amp; Freelance Opportunities</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Tertarik berkolaborasi atau berdiskusi tentang proyek?
              </h2>

              <p className="mt-5 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Saya siap membantu merancang dan membangun aplikasi web maupun mobile yang cepat, terstruktur, dan siap produksi—baik untuk kebutuhan tim perusahaan maupun proyek kustom.
              </p>

              {/* Baris Quick Social & Copy Email */}
              <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-mono text-xs transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Email disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>{email}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {/* GitHub SVG */}
                  <a
                    href="https://github.com/arlyn-art"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </a>

                  {/* LinkedIn SVG */}
                  <a
                    href="https://linkedin.com/in/arlyn-arta"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Sisi Kanan (6 Kolom): Atas = Mac + iPhone Lebih Tinggi | Bawah = Tombol CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              {/* BAGIAN ATAS: Mac Window + iPhone Frame di sebelahnya */}
              <div className="relative pb-3 pr-2 sm:pr-5">
                
                {/* 1. MAC WINDOW (Tinggi viewport diperbesar ke h-64 sm:h-72) */}
                <div className="w-[85%] rounded-2xl border border-white/15 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-md">
                  {/* Mac Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                      dashboard.app
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE
                    </span>
                  </div>

                  {/* Viewport Mac yang Auto-Scroll */}
                  <div className="relative h-64 sm:h-72 overflow-hidden p-4">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-950/90 to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-950 to-transparent z-10" />

                    <div className="space-y-3 animate-mac-scroll">
                      {/* Row 1: Metric Cards */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                          <div className="flex items-center justify-between text-slate-400">
                            <span className="text-[10px] font-mono">PERFORMANCE</span>
                            <Activity className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <p className="mt-1.5 text-lg sm:text-xl font-bold text-white font-mono">
                            99.8%
                          </p>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                            <TrendingUp className="w-3 h-3" /> Core Web Vitals
                          </span>
                        </div>

                        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                          <div className="flex items-center justify-between text-slate-400">
                            <span className="text-[10px] font-mono">DELIVERED</span>
                            <Users className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <p className="mt-1.5 text-lg sm:text-xl font-bold text-white font-mono">
                            15+ Apps
                          </p>
                          <span className="text-[10px] text-blue-400 block mt-0.5">
                            Production Ready
                          </span>
                        </div>
                      </div>

                      {/* Row 2: Mini Bar Chart */}
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-mono text-slate-400">
                            SYSTEM THROUGHPUT
                          </span>
                          <span className="text-[10px] font-mono text-blue-400">+24.5%</span>
                        </div>
                        <div className="flex items-end gap-1.5 h-16 pt-1">
                          {[45, 65, 50, 80, 60, 95, 75, 100, 85, 92].map((height, i) => (
                            <div
                              key={i}
                              style={{ height: `${height}%` }}
                              className={`flex-1 rounded-t-sm ${
                                i >= 7 ? 'bg-blue-500' : 'bg-slate-700/80'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Row 3: Pipeline Status */}
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5 space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          ACTIVE PIPELINES
                        </span>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Laravel + Filament CMS
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                            Healthy
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                            Next.js + Flutter Stack
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                            Synced
                          </span>
                        </div>
                      </div>

                      {/* Row 4: Recent Release Log */}
                      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-xs font-mono text-slate-300">main • v2.4.0</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">2m ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. IPHONE FRAME (Tinggi diperbesar ke h-44 sm:h-52, tetap lebih pendek dari Mac) */}
                <div className="absolute right-0 bottom-0 w-32 sm:w-36 rounded-[24px] border-2 border-slate-700/90 bg-slate-950 shadow-2xl shadow-black/60 overflow-hidden z-20">
                  {/* Dynamic Island / Notch */}
                  <div className="flex justify-center py-2 bg-slate-900 border-b border-white/5">
                    <div className="w-10 h-1.5 rounded-full bg-slate-800" />
                  </div>

                  {/* Viewport iPhone yang Auto-Scroll */}
                  <div className="relative h-44 sm:h-52 overflow-hidden p-2.5">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-slate-950 to-transparent z-10" />

                    <div className="space-y-2.5 animate-iphone-scroll">
                      {/* Mini Mobile Card 1 */}
                      <div className="rounded-xl bg-blue-600/15 border border-blue-500/30 p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-blue-300">MOBILE UI</span>
                          <Smartphone className="w-3 h-3 text-blue-400" />
                        </div>
                        <p className="mt-1 text-sm font-bold text-white font-mono">Flutter</p>
                        <span className="text-[9px] text-emerald-400 block mt-0.5">
                          60fps Smooth
                        </span>
                      </div>

                      {/* Mini Mobile Card 2 */}
                      <div className="rounded-xl bg-white/[0.05] border border-white/10 p-2.5">
                        <span className="text-[9px] font-mono text-slate-400 block">
                          API LATENCY
                        </span>
                        <p className="mt-1 text-sm font-bold text-white font-mono">42 ms</p>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full w-4/5 bg-emerald-400 rounded-full" />
                        </div>
                      </div>

                      {/* Mini Mobile Card 3 */}
                      <div className="rounded-xl bg-white/[0.05] border border-white/10 p-2.5">
                        <span className="text-[9px] font-mono text-slate-400 block">
                          RESPONSIVE
                        </span>
                        <p className="mt-1 text-xs font-semibold text-white">100% Adaptive</p>
                        <span className="mt-1 inline-flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Passed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="flex justify-center py-1.5 bg-slate-950">
                    <div className="w-10 h-1 rounded-full bg-slate-700" />
                  </div>
                </div>

              </div>

              {/* BAGIAN BAWAH: 2 Tombol CTA Sejajar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/25 group"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Hubungi Saya</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="/assets/cv/CV-Arlyn-Arta-Pradipa.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition"
                >
                  <FileText className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>Download CV</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}