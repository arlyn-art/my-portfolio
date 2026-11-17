import Link from 'next/link';
import { experiences } from '@/data/experience';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CareerSnapshot() {
  return (
    <section
      id="experience"
      className="py-24 bg-slate-50 text-slate-900 px-6 sm:px-8 border-t border-slate-100"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Kolom Kiri (4 Kolom): Header Section + CTA ke Halaman Journey */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Track</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Work Experience
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Perjalanan profesional saya dalam membangun solusi digital—mulai dari agensi kreatif, proyek enterprise, hingga pengembangan aplikasi mandiri.
            </p>

            {/* Tombol ke halaman Journey lengkap */}
            <div className="mt-8">
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-600 transition shadow-2xs group"
              >
                <span>Lihat Detail Perjalanan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Kolom Kanan (8 Kolom): Timeline List Pengalaman */}
          <div className="lg:col-span-8 relative">
            {/* Garis Vertikal Penghubung (Desktop & Tablet) */}
            <div className="hidden sm:block absolute left-7 top-6 bottom-6 w-0.5 bg-slate-200" />

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative sm:pl-20 group"
                >
                  {/* Logo Perusahaan di Garis Timeline (Desktop & Tablet) */}
                  <div className="hidden sm:flex absolute left-0 top-6 w-14 h-14 rounded-2xl bg-white border border-slate-200 p-2 items-center justify-center shadow-xs z-10 group-hover:border-blue-300 transition-colors">
                    <img
                      src={`/${exp.logo}`}
                      alt={exp.company}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Kartu Pengalaman */}
                  <div
                    className={`rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
                      exp.isCurrent
                        ? 'bg-white border-blue-200/80 shadow-md shadow-blue-950/5'
                        : 'bg-white border-slate-200/90 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40'
                    }`}
                  >
                    {/* Header Kartu: Logo (Mobile) + Posisi + Badge Status */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* Logo khusus layar HP */}
                        <div className="sm:hidden w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                          <img
                            src={`/${exp.logo}`}
                            alt={exp.company}
                            className="w-full h-full object-contain rounded-md"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {exp.position}
                          </h3>
                          <p className="text-sm font-semibold text-slate-600 mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Badge Periode & Tipe Kerja */}
                      <div className="flex flex-col sm:items-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                            exp.isCurrent
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {exp.isCurrent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                          {exp.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Ringkasan Singkat */}
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                      {exp.summary}
                    </p>

                    {/* 2 Poin Dampak Utama */}
                    <ul className="mt-4 space-y-2 pt-4 border-t border-slate-100">
                      {exp.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Badges */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-slate-600 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}