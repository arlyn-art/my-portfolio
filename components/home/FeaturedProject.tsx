import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects';
import { getProjectTitle, generateProjectSlug } from '@/lib/slug';
import { ArrowUpRight, Sparkles, CheckCircle2, Globe, ArrowRight } from 'lucide-react';

export default function FeaturedProject() {
  const featuredIds = ['comm-7', 'comm-2'];

  const featuredList = featuredIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (featuredList.length === 0) return null;

  return (
    <section
      id="featured-project"
      className="py-24 bg-white text-slate-900 px-6 sm:px-8 border-b border-slate-100"
    >
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Spotlight Case Studies
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-600 max-w-md text-sm sm:text-base md:text-right">
            Sorotan proyek unggulan dengan arsitektur kompleks dan dampak bisnis terukur.
          </p>
        </div>

        {/* Spotlight Items */}
        <div className="space-y-24 lg:space-y-28">
          {featuredList.map((featured, index) => {
            const title = getProjectTitle(featured);
            const slug = generateProjectSlug(featured);
            const shortDesc =
              typeof featured.shortDescription === 'string'
                ? featured.shortDescription
                : featured.shortDescription?.id ?? '';

            const featureList: string[] = Array.isArray(featured.features)
              ? featured.features
              : featured.features?.id ?? [];

            const numberLabel = String(index + 1).padStart(2, '0');
            const displayUrl = featured.liveUrl
              ? featured.liveUrl.replace(/^https?:\/\//, '')
              : 'production-app.local';

            const isReversed = index % 2 === 1;

            return (
              <div
                key={featured.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
              >
                {/* Kolom Media (Browser Mockup) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-2xl border border-slate-200/90 bg-slate-100/80 p-2 sm:p-3 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between px-3 py-2 bg-white rounded-t-xl border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] font-mono text-slate-500 max-w-[200px] sm:max-w-xs truncate">
                        <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{displayUrl}</span>
                      </div>
                      <div className="w-8" />
                    </div>

                    <Link
                      href={`/projects/${slug}`}
                      className="relative aspect-video w-full rounded-b-xl overflow-hidden bg-slate-900 block group"
                    >
                      {'video' in featured &&
                      typeof featured.video === 'string' &&
                      featured.video ? (
                        <video
                          src={`/${featured.video}`}
                          poster={featured.thumbnail ? `/${featured.thumbnail}` : undefined}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : featured.thumbnail ? (
                        <Image
                          src={`/${featured.thumbnail}`}
                          alt={title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}
                    </Link>
                  </div>

                  {/* Caption / Impact di bawah Browser */}
                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 px-1">
                    <span className="text-xs font-mono text-slate-500">
                      {'impact' in featured && typeof featured.impact === 'string'
                        ? featured.impact
                        : featured.company}
                    </span>

                    {featured.liveUrl && (
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition group"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Kolom Narasi Ringkas */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-slate-200 select-none leading-none">
                      {numberLabel}
                    </span>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {featured.company.replace(/\s*\(.*?\)\s*/g, '')}
                      </p>
                      {'agency' in featured &&
                        typeof featured.agency === 'string' &&
                        featured.agency && (
                          <p className="text-[11px] font-mono text-blue-600">
                            via {featured.agency}
                          </p>
                        )}
                    </div>
                  </div>

                  <Link href={`/projects/${slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-blue-600 transition-colors leading-tight tracking-tight">
                      {title}
                    </h3>
                  </Link>

                  {/* Ringkasan 1 Paragraf Tajam */}
                  <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {shortDesc}
                  </p>

                  {/* Maksimal 3 Key Highlights */}
                  {featureList.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <ul className="space-y-2">
                        {featureList.slice(0, 3).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Maksimal 4 Tech Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {featured.technologies.slice(0, 4).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {featured.technologies.length > 4 && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-slate-400 text-xs font-mono">
                        +{featured.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Primary Action CTA */}
                  <div className="mt-7 pt-5 border-t border-slate-100 flex items-center gap-4">
                    <Link
                      href={`/projects/${slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-colors group"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}