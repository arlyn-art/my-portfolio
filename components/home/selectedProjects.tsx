'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects';
import { ExternalLink, Code, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SelectedProjects() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ambil 3 proyek teratas untuk ditampilkan di halaman Home
  const featuredProjects = projects.slice(0, 3);

  // Fungsi untuk menggeser slider saat tombol panah diklik
  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="py-24 bg-slate-50 text-slate-900 px-6 sm:px-8 overflow-hidden">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-blue-600 font-mono text-sm tracking-wider uppercase">Portfolio Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-600 max-w-xl text-sm sm:text-base md:text-right text-left">
            Beberapa proyek pilihan yang pernah saya kembangkan, mulai dari aplikasi web komersial skala enterprise hingga sistem kustom.
          </p>
        </div>

        {/* Wrapper Relative untuk Posisi Arrow Kiri & Kanan */}
        <div className="relative">
          
          {/* Arrow Left (Melayang di sisi kiri tengah khusus mobile) */}
          <button
            type="button"
            onClick={() => scrollSlider('left')}
            aria-label="Proyek sebelumnya"
            className="md:hidden absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Container Slider / Grid */}
          <div 
            ref={sliderRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="min-w-[78vw] sm:min-w-[60vw] md:min-w-0 snap-center bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Thumbnail */}
                <div className="relative h-56 sm:h-72 bg-slate-100 overflow-hidden border-b border-slate-100">
                  {project.thumbnail ? (
                    <Image 
                      src={`/${project.thumbnail}`} 
                      alt={project.title.id} 
                      fill 
                      sizes="(max-width: 768px) 78vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 font-mono text-xs">
                      No Thumbnail Available
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-blue-600 shadow-xs uppercase tracking-wider font-mono">
                    {project.category}
                  </span>
                </div>

                {/* Konten Card */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">{project.company}</p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title.id}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {project.shortDescription.id}
                    </p>
                  </div>

                  {/* Tech Stack & Action */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px] font-mono">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links Action */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-blue-600 transition"
                            title="Live Preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-blue-600 transition"
                            title="GitHub Repository"
                          >
                            <Code className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Arrow Right (Melayang di sisi kanan tengah khusus mobile) */}
          <button
            type="button"
            onClick={() => scrollSlider('right')}
            aria-label="Proyek selanjutnya"
            className="md:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* View All Projects Button */}
        <div className="mt-10 md:mt-12 text-center">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition shadow-sm"
          >
            <span>Lihat Semua Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}