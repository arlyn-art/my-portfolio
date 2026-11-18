'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects';
import { getProjectTitle, generateProjectSlug } from '@/lib/slug';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Code,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
} from 'lucide-react';

type CategoryKey = 'all' | 'commercial' | 'personal' | 'documentation';

const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'personal', label: 'Freelance & Independent' },
  { key: 'documentation', label: 'System Blueprint' },
];

const CATEGORY_BADGES: Record<string, string> = {
  commercial: 'Commercial',
  personal: 'Freelance & Independent',
  documentation: 'System Blueprint',
};

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryCounts = useMemo(() => {
    return {
      all: projects.length,
      commercial: projects.filter((p) => p.category === 'commercial').length,
      personal: projects.filter((p) => p.category === 'personal').length,
      documentation: projects.filter((p) => p.category === 'documentation').length,
    };
  }, []);

  // Filter & urutkan proyek A-Z berdasarkan Title (mix semua kategori)
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesCategory =
          activeCategory === 'all' || project.category === activeCategory;

        if (!matchesCategory) return false;
        if (!searchQuery.trim()) return true;

        const q = searchQuery.toLowerCase();
        const title = getProjectTitle(project);
        const desc =
          typeof project.shortDescription === 'string'
            ? project.shortDescription
            : project.shortDescription?.id ?? '';
        const company = project.company ?? '';
        const techs = project.technologies.join(' ');

        return (
          title.toLowerCase().includes(q) ||
          desc.toLowerCase().includes(q) ||
          company.toLowerCase().includes(q) ||
          techs.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const titleA = getProjectTitle(a);
        const titleB = getProjectTitle(b);
        return titleA.localeCompare(titleB, 'id', { sensitivity: 'base' });
      });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, safeCurrentPage]);

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 pt-28 pb-24">
      {/* HEADER SECTION */}
      <section className="px-6 sm:px-8 pb-12 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              All Projects &amp; Case Studies
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Kumpulan lengkap aplikasi web komersial, proyek independen, hingga cetak biru sistem enterprise yang pernah saya rancang dan kembangkan.
            </p>
          </div>

          {/* FILTER TABS & SEARCH BAR */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleCategoryChange(tab.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                        isActive ? 'bg-white/15 text-white' : 'bg-white text-slate-500'
                      }`}
                    >
                      {categoryCounts[tab.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari proyek atau tech stack..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID SECTION */}
      <section className="px-6 sm:px-8 pt-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 text-xs font-mono text-slate-500">
            <span>
              Menampilkan {paginatedProjects.length} dari {filteredProjects.length} proyek (A–Z)
            </span>
            {totalPages > 1 && (
              <span>
                Halaman {safeCurrentPage} dari {totalPages}
              </span>
            )}
          </div>

          {paginatedProjects.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">Proyek tidak ditemukan</h3>
              <p className="mt-1 text-sm text-slate-500">
                Coba ubah kata kunci pencarian atau pilih kategori lain.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedProjects.map((project) => {
                const title = getProjectTitle(project);
                const slug = generateProjectSlug(project);
                const shortDesc =
                  typeof project.shortDescription === 'string'
                    ? project.shortDescription
                    : project.shortDescription?.id ?? '';

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <Link
                      href={`/projects/${slug}`}
                      className="relative h-56 sm:h-60 bg-slate-100 overflow-hidden border-b border-slate-100 block"
                    >
                      {project.thumbnail ? (
                        <Image
                          src={`/${project.thumbnail}`}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 font-mono text-xs">
                          No Thumbnail Available
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-blue-600 shadow-2xs uppercase tracking-wider font-mono">
                        {CATEGORY_BADGES[project.category] || project.category}
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

                        <Link href={`/projects/${slug}`}>
                          <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {title}
                          </h2>
                        </Link>

                        <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {shortDesc}
                        </p>
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

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-blue-600 transition"
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
                                className="text-slate-500 hover:text-blue-600 transition"
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
          )}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, safeCurrentPage - 1))}
                disabled={safeCurrentPage === 1}
                aria-label="Halaman sebelumnya"
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => {
                const isCurrent = page === safeCurrentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl font-mono text-xs font-semibold transition cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, safeCurrentPage + 1))}
                disabled={safeCurrentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}