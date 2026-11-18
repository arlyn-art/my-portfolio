'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  User,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Rocket,
  Handshake,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  FileText,
  Mail,
} from 'lucide-react';

const PROFILE_PHOTOS = [
  {
    src: '/assets/images/foto-profile.jpg',
    caption: 'Arlyn Arta Pradipa — Full Stack Developer',
  },
  {
    src: '/assets/images/profile.jpeg',
    caption: 'Jawa Tengah, Indonesia',
  },
  {
    src: '/assets/images/profile-2.jpeg',
    caption: 'Jawa Tengah, Indonesia',
  },
];

const QUICK_FACTS = [
  {
    label: 'DOMICILE',
    value: 'Jakarta, Indonesia',
    sub: 'Open to Remote & On-site',
    icon: MapPin,
  },
  {
    label: 'CURRENT ROLE',
    value: 'Full Stack Developer',
    sub: 'PT Design Tiga Selaras',
    icon: Briefcase,
  },
  {
    label: 'EDUCATION',
    value: 'Universitas Terbuka',
    sub: 'Information Systems / Tech',
    icon: GraduationCap,
  },
  {
    label: 'CORE FOCUS',
    value: 'Web & Mobile Apps',
    sub: 'Laravel, Next.js & Flutter',
    icon: Code2,
  },
];

const CORE_VALUES = [
  {
    title: 'Clean & Maintainable Architecture',
    description:
      'Menulis kode yang terstruktur, mudah dibaca, dan terukur agar sistem tetap stabil saat skala pengguna maupun fitur terus bertumbuh.',
    icon: Lightbulb,
    accent: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    title: 'Performance & User-First Execution',
    description:
      'Memastikan setiap antarmuka terasa cepat, responsif di berbagai ukuran layar, dan ramah mesin pencari tanpa mengorbankan estetika.',
    icon: Rocket,
    accent: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    title: 'Collaborative & Solution-Oriented',
    description:
      'Terbiasa menjembatani kebutuhan bisnis klien, desain UI/UX, hingga dokumentasi teknis agar produk selesai tepat sasaran.',
    icon: Handshake,
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
];

const TECH_TAGS = [
  'Laravel',
  'Filament PHP',
  'Vue 3',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Flutter',
  'MySQL',
  'Docker',
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROFILE_PHOTOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PROFILE_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  // Pointer Events (Mendukung Mouse Drag & Touch Swipe)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startXRef.current === null) return;
    const deltaX = e.clientX - startXRef.current;
    // Batasi tarikan maksimal +-140px agar tetap terasa natural
    const clampedX = Math.max(-140, Math.min(140, deltaX));
    setDragX(clampedX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    const threshold = 50; // Jarak minimal geser (50px) untuk ganti foto
    if (dragX >= threshold) {
      handleNext();
    } else if (dragX <= -threshold) {
      handlePrev();
    }

    setIsDragging(false);
    setDragX(0);
    startXRef.current = null;
  };

  return (
    <main className="bg-white text-slate-900 pt-28 pb-24">
      <section className="px-6 sm:px-8 pb-24 border-b border-slate-100">
        <div className="container mx-auto">
          {/* Top Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-4">
              <User className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Crafting Reliable Web &amp; Mobile Digital Experiences
            </h1>

            <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
              Mengenal lebih dekat latar belakang, cara kerja, dan prinsip teknis di balik setiap produk digital yang saya bangun.
            </p>
          </div>

          {/* 2-Column Split: Photo Stack (Left) & Bio Story (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            
            {/* Left Column: Interactive Draggable Stacked Photo Cards */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative w-72 h-88 sm:w-80 sm:h-96 select-none touch-pan-y cursor-grab active:cursor-grabbing"
              >
                {PROFILE_PHOTOS.map((photo, index) => {
                  const offset =
                    (index - activeIndex + PROFILE_PHOTOS.length) % PROFILE_PHOTOS.length;

                  let cardStyle = '';
                  if (offset === 0) {
                    cardStyle = 'z-30 opacity-100 shadow-2xl';
                  } else if (offset === 1) {
                    cardStyle =
                      'z-20 translate-x-4 translate-y-3 rotate-3 scale-95 opacity-80 shadow-lg';
                  } else {
                    cardStyle =
                      'z-10 -translate-x-4 translate-y-4 -rotate-3 scale-90 opacity-55 shadow-md';
                  }

                  // Kartu terdepan mengikuti gerakan drag mouse/jari secara real-time
                  const activeTransform =
                    offset === 0
                      ? {
                          transform: `translateX(${dragX}px) rotate(${dragX * 0.08}deg)`,
                          transition: isDragging
                            ? 'none'
                            : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                        }
                      : undefined;

                  return (
                    <div
                      key={photo.src}
                      style={activeTransform}
                      className={`absolute inset-0 rounded-3xl overflow-hidden border-4 border-white bg-slate-100 ${
                        offset !== 0 ? 'transition-all duration-500 ease-out' : ''
                      } ${cardStyle}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      {offset === 0 && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 pt-10 pointer-events-none">
                          <p className="text-xs font-mono text-white/90">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Foto sebelumnya"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="px-5 py-2 rounded-full border border-slate-200 bg-slate-50 font-mono text-xs font-semibold text-slate-600">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(PROFILE_PHOTOS.length).padStart(2, '0')}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Foto selanjutnya"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-2xs cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Narrative Bio */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                Full Stack &amp; Mobile Developer
              </span>

              <h2 className="mt-5 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                Halo, saya Arlyn Arta Pradipa.
              </h2>

              <div className="mt-6 space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Saya adalah seorang <strong className="text-slate-900 font-semibold">Full Stack Web &amp; Mobile Developer</strong> yang berbasis di Jakarta, dengan pengalaman membangun berbagai platform komersial berskala nasional, aplikasi enterprise, hingga sistem informasi kustom.
                </p>
                <p>
                  Dalam keseharian profesional di <strong className="text-slate-900 font-semibold">PT Design Tiga Selaras (DesignCub3)</strong> maupun proyek independen, saya terbiasa menangani siklus pengembangan secara menyeluruh—mulai dari perancangan skema database, pengembangan backend menggunakan <strong className="text-slate-900 font-semibold">Laravel &amp; Filament</strong>, hingga membangun antarmuka interaktif dengan <strong className="text-slate-900 font-semibold">Next.js, React, Vue 3, dan Flutter</strong>.
                </p>
                <p>
                  Selain menulis kode, saya juga memiliki latar belakang dalam penyusunan spesifikasi teknis (<em className="text-slate-700">system blueprinting</em>) dan digitalisasi alur kerja instansi, sehingga setiap fitur yang dibangun selalu selaras dengan tujuan bisnis penggunanya.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Primary Stack &amp; Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {TECH_TAGS.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition shadow-md shadow-blue-600/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Mari Berdiskusi</span>
                </Link>

                <a
                  href="/assets/cv/CV-Arlyn-Arta-Pradipa.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 text-sm font-semibold transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Unduh CV</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK FACTS BENTO CARDS */}
      <section className="px-6 sm:px-8 py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {QUICK_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xs hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                      {fact.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {fact.value}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-slate-500">{fact.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE VALUES / WORKING PRINCIPLES */}
      <section className="px-6 sm:px-8 pt-20">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-blue-600 font-mono text-xs font-semibold uppercase tracking-widest">
              Work Philosophy
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Prinsip Kerja &amp; Pendekatan Teknis
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white p-7 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:border-blue-200"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${val.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{val.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}