import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import projects from '@/data/projects';
import { getProjectTitle, generateProjectSlug } from '@/lib/slug';
import {
  ArrowLeft,
  ExternalLink,
  Code,
  CheckCircle2,
  Building2,
  Layers,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: generateProjectSlug(project),
  }));
}

// 1. Komponen anak yang menerima Promise params di dalam Suspense
async function ProjectDetailContent({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (p) => generateProjectSlug(p) === slug || p.id === slug
  );

  if (!project) {
    notFound();
  }

  const title = getProjectTitle(project);
  const shortDesc =
    typeof project.shortDescription === 'string'
      ? project.shortDescription
      : project.shortDescription?.id ?? '';
  const fullDesc =
    typeof project.description === 'string'
      ? project.description
      : project.description?.id ?? '';

  const featureList: string[] = Array.isArray(project.features)
    ? project.features
    : project.features?.id ?? [];

  return (
    <div className="container mx-auto">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Semua Proyek</span>
      </Link>

      {/* Header Info */}
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold uppercase">
            {project.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {project.company}
          </span>
          {'agency' in project &&
            typeof project.agency === 'string' &&
            project.agency && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600">via {project.agency}</span>
              </>
            )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {title}
        </h1>

        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          {shortDesc}
        </p>

        {(project.liveUrl || project.github) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 text-sm font-semibold transition"
              >
                <Code className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Media Preview */}
      <div className="mt-10 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg">
        {'video' in project && typeof project.video === 'string' && project.video ? (
          <video
            src={`/${project.video}`}
            poster={project.thumbnail ? `/${project.thumbnail}` : undefined}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover"
          />
        ) : project.thumbnail ? (
          <Image
            src={`/${project.thumbnail}`}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 font-mono text-xs gap-2">
            <Layers className="w-6 h-6" />
            <span>Preview Not Available</span>
          </div>
        )}
      </div>

      {/* Full Description & Key Features */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-8 space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">Overview &amp; Context</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {fullDesc || shortDesc}
          </p>

          {featureList.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Key Features &amp; Deliverables
              </h3>
              <ul className="space-y-3">
                {featureList.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Client / Organization
              </h3>
              <p className="text-sm font-bold text-slate-900">{project.company}</p>
              {'agency' in project &&
                typeof project.agency === 'string' &&
                project.agency && (
                  <p className="text-xs font-mono text-blue-600 mt-0.5">
                    via {project.agency}
                  </p>
                )}
            </div>

            <div className="pt-5 border-t border-slate-200/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Komponen utama membungkus ProjectDetailContent dengan Suspense
export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <main className="bg-white min-h-screen text-slate-900 pt-12 sm:pt-16 pb-24 px-6 sm:px-8">
      <Suspense
        fallback={
          <div className="container mx-auto animate-pulse space-y-6">
            <div className="h-5 w-44 rounded bg-slate-100" />
            <div className="h-10 w-2/3 rounded bg-slate-100" />
            <div className="aspect-video w-full rounded-2xl bg-slate-100" />
          </div>
        }
      >
        <ProjectDetailContent params={params} />
      </Suspense>
    </main>
  );
}