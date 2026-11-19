'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import journeys from '@/data/journey';
import {
  Compass,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Camera,
  CheckCircle2,
  Navigation,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

type JourneyItem = (typeof journeys)[number];

interface CareerMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'work' | 'education';
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

const CAREER_TIMELINE: CareerMilestone[] = [
  {
    period: '2024 — Present',
    role: 'Full Stack Developer',
    organization: 'PT Design Tiga Selaras (DesignCub3)',
    location: 'Jakarta, Indonesia',
    type: 'work',
    current: true,
    summary:
      'Mengembangkan dan memelihara berbagai platform web komersial, dashboard manajemen internal, serta mikro-aplikasi kampanye digital berskala nasional untuk beragam klien korporat.',
    highlights: [
      'Membangun sistem web end-to-end menggunakan Laravel, Filament PHP, Vue 3, dan Next.js.',
      'Melakukan optimasi performa frontend, integrasi API pihak ketiga, dan pengelolaan deployment produksi.',
      'Berkolaborasi langsung dengan tim desain UI/UX dan project manager untuk memastikan ketepatan spesifikasi.',
    ],
    tags: ['Laravel', 'Filament', 'Vue 3', 'Next.js', 'MySQL'],
  },
  {
    period: '2024 — Present',
    role: 'Freelance Full Stack & Mobile Developer',
    organization: 'Independent / Client Projects',
    location: 'Remote • Jakarta',
    type: 'work',
    summary:
      'Merancang solusi digital kustom mulai dari website profil perusahaan interaktif, aplikasi mobile lintas platform, hingga dokumen arsitektur teknis (system blueprinting).',
    highlights: [
      'Mengembangkan aplikasi web dan mobile menggunakan React, Next.js, Tailwind CSS, dan Flutter.',
      'Menyusun cetak biru modernisasi sistem manajemen dokumen dan perpustakaan digital instansi.',
      'Menerapkan integrasi peta interaktif (Leaflet/OpenStreetMap) serta otomasi form & email.',
    ],
    tags: ['React', 'Next.js', 'Flutter', 'Tailwind CSS', 'System Blueprint'],
  },
  {
    period: '2023 — Present',
    role: 'Sarjana (S1) — Sistem Informasi / Teknologi',
    organization: 'Universitas Terbuka',
    location: 'Jakarta, Indonesia',
    type: 'education',
    summary:
      'Menempuh pendidikan tinggi di bidang sistem informasi dan rekayasa perangkat lunak sembari berkarier aktif di industri pengembangan web.',
    highlights: [
      'Fokus pada perancangan basis data, arsitektur sistem informasi, dan manajemen proyek TI.',
      'Menerapkan praktik pengembangan perangkat lunak modern secara langsung dalam lingkungan kerja nyata.',
    ],
    tags: ['Information Systems', 'Database Design', 'Software Engineering'],
  },
];

export default function JourneyPage() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    if (selectedJourney) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedJourney]);

  const openJourneyModal = (item: JourneyItem) => {
    setSelectedJourney(item);
    setActivePhotoIndex(0);
  };

  const closeJourneyModal = () => {
    setSelectedJourney(null);
    setActivePhotoIndex(0);
  };

  const modalPhotos = selectedJourney
    ? [selectedJourney.image, ...selectedJourney.gallery].filter(Boolean)
    : [];

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 pt-12 sm:pt-16 pb-24">
      {/* HEADER SECTION */}
      <section className="px-6 sm:px-8 pb-12 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Journey &amp; Milestones</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Career Path, Education &amp; Road Stories
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Rekam jejak perjalanan profesional saya di dunia pengembangan perangkat lunak, dilengkapi catatan perjalanan dan hobi touring di luar layar kode.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-mono text-xs font-semibold uppercase tracking-widest">
                01 / Professional Track
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Career &amp; Academic Timeline
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-sm text-slate-500 max-w-md md:text-right">
              Pengalaman kerja industri, proyek independen, dan latar belakang pendidikan.
            </p>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-200 before:to-transparent">
            {CAREER_TIMELINE.map((item, idx) => {
              const Icon = item.type === 'work' ? Briefcase : GraduationCap;
              return (
                <div key={idx} className="relative flex items-start gap-6 md:gap-8 group">
                  <div
                    className={`relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 shrink-0 transition-transform group-hover:scale-105 ${
                      item.current
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/25'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xs hover:shadow-lg hover:border-blue-200 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.period}</span>
                      </div>

                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-mono text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {item.role}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                      <span className="font-semibold text-blue-600">{item.organization}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {item.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20 bg-white border-t border-slate-200/80">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 / Beyond The Code</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Travel Logbook
              </h2>
            </div>
            <p className="mt-3 md:mt-0 text-sm sm:text-base text-slate-600 max-w-md md:text-right">
              Di luar aktivitas pemrograman, saya menyukai perjalanan jarak jauh dengan sepeda motor untuk mengeksplorasi lanskap alam dan menyegarkan pikiran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {journeys.map((item) => {
              const totalPhotos = 1 + item.gallery.length;
              return (
                <article
                  key={item.id}
                  onClick={() => openJourneyModal(item)}
                  className="group rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-60 w-full bg-slate-200 overflow-hidden">
                      <Image
                        src={`/${item.image}`}
                        alt={item.place.id}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-mono text-xs font-bold shadow-2xs">
                        {item.year}
                      </span>

                      <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white font-mono text-[11px]">
                        <Camera className="w-3 h-3" />
                        <span>{totalPhotos} Foto</span>
                      </span>

                      <div className="absolute bottom-3.5 left-4 right-4 flex items-center gap-1.5 text-white text-xs font-mono">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.province.id}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.place.id}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.shortDescription.id}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.destinations.id.map((dest) => (
                          <span
                            key={dest}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px] font-mono"
                          >
                            <Navigation className="w-2.5 h-2.5 text-blue-600" />
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Lihat Cerita &amp; Galeri</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedJourney && (
        <div
          onClick={closeJourneyModal}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:h-[82vh] lg:max-h-[660px]"
          >
            {/* Tombol Close */}
            <button
              type="button"
              onClick={closeJourneyModal}
              aria-label="Tutup modal"
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-slate-900/75 lg:bg-slate-100 hover:bg-rose-500 text-white lg:text-slate-700 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between relative min-h-[260px] sm:min-h-[340px] lg:h-full">
              <div className="relative flex-1 w-full overflow-hidden">
                <Image
                  src={`/${modalPhotos[activePhotoIndex]}`}
                  alt={`${selectedJourney.place.id} - Foto ${activePhotoIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {modalPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === 0 ? modalPhotos.length - 1 : prev - 1
                        )
                      }
                      aria-label="Foto sebelumnya"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === modalPhotos.length - 1 ? 0 : prev + 1
                        )
                      }
                      aria-label="Foto berikutnya"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-white font-mono text-[11px]">
                      {activePhotoIndex + 1} / {modalPhotos.length}
                    </div>
                  </>
                )}
              </div>

              {modalPhotos.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/95 border-t border-slate-800 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {modalPhotos.map((photo, idx) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                        activePhotoIndex === idx
                          ? 'border-blue-500 scale-105 opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-90'
                      }`}
                    >
                      <Image
                        src={`/${photo}`}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 p-6 sm:p-7 overflow-y-auto flex flex-col justify-between bg-white">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-600 mb-1.5 pr-8">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedJourney.province.id}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                    {selectedJourney.year}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedJourney.place.id}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedJourney.description.id}
                </p>

                {/* Destinations Visited */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Destinations Visited
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJourney.destinations.id.map((dest) => (
                      <span
                        key={dest}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium"
                      >
                        <Navigation className="w-3 h-3 text-blue-600 shrink-0" />
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trip Highlights */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Trip Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedJourney.highlights.id.map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}