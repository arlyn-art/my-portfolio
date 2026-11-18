'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects';
import { getProjectTitle, generateProjectSlug } from '@/lib/slug';
import {
  ExternalLink,
  Code,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';

const categoryLabels: Record<string, string> = {
  commercial: 'Commercial',
  personal: 'Freelance & Independent',
  documentation: 'System Blueprint',
};

export default function SelectedProjects() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const featuredIds = ['comm-1', 'pers-1', 'doc-1'];

  const featuredProjects = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-600 max-w-xl text-sm sm:text-base md:text-right text-left">
            Beberapa proyek pilihan yang pernah saya kembangkan, mulai dari aplikasi web komersial skala enterprise hingga sistem kustom.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollSlider('left')}
            aria-label="Proyek sebelumnya"
            className="md:hidden absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={sliderRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredProjects.map((project) => {
              const title = getProjectTitle(project);
              const slug = generateProjectSlug(project);
              const shortDesc =
                typeof project.shortDescription === 'string'
                  ? project.shortDescription
                  : project.shortDescription?.id ?? '';

              return (
                <div
                  key={project.id}
                  className="min-w-[78vw] sm:min-w-[60vw] md:min-w-0 snap-center bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Thumbnail (Clickable ke Detail) */}
                  <Link
                    href={`/projects/${slug}`}
                    className="relative h-64 sm:h-72 bg-slate-100 overflow-hidden border-b border-slate-100 block"
                  >
                    {project.thumbnail ? (
                      <Image
                        src={`/${project.thumbnail}`}
                        alt={title || 'Project Thumbnail'}
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
                      {categoryLabels[project.category] || project.category}
                    </span>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs mb-1.5">
                        <span className="font-semibold text-slate-500">{project.company}</span>
                        {'agency' in project &&
                          typeof project.agency === 'string' &&
                          project.agency && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-blue-600/80 font-medium">
                                via {project.agency}
                              </span>
                            </>
                          )}
                      </div>

                      {/* Judul (Clickable ke Detail) */}
                      <Link href={`/projects/${slug}`}>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{shortDesc}</p>
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px] font-mono">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Footer Card: External Icons + See Details */}
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

                        <Link
                          href={`/projects/${slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition group/link"
                        >
                          <span>See Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollSlider('right')}
            aria-label="Proyek selanjutnya"
            className="md:hidden absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 active:scale-95 transition shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

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