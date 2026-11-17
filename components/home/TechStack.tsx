import { Layout, Server, FileCode2, Terminal, Check } from 'lucide-react';

interface CapabilityGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  skills: string[];
  deliverables: string[];
}

const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'frontend-mobile',
    title: 'Frontend & Mobile Engineering',
    subtitle: 'UI/UX Implementation & Cross-Platform',
    description:
      'Membangun antarmuka web dan mobile yang responsif, interaktif, dan berorientasi pada kecepatan akses serta kenyamanan pengguna.',
    icon: Layout,
    accentColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 border-blue-100',
    skills: [
      'Next.js',
      'React',
      'Vue 3',
      'Tailwind CSS',
      'Alpine.js',
      'Flutter',
      'TypeScript',
    ],
    deliverables: [
      'Responsive Web & Mobile App UI',
      'Component-Driven Architecture',
      'Interactive Micro-interactions & SEO',
    ],
  },
  {
    id: 'backend-api',
    title: 'Backend & Database Architecture',
    subtitle: 'Scalable Server-Side & API',
    description:
      'Merancang logika bisnis, struktur database relasional, serta integrasi API yang aman dan mudah dikembangkan untuk jangka panjang.',
    icon: Server,
    accentColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 border-indigo-100',
    skills: [
      'Laravel',
      'PHP',
      'Livewire',
      'Inertia.js',
      'MySQL',
      'RESTful API',
    ],
    deliverables: [
      'Full-Stack Monolith & SPA Integration',
      'Relational Database Schema Design',
      'Authentication & Third-Party APIs',
    ],
  },
  {
    id: 'cms-enterprise',
    title: 'CMS & System Blueprinting',
    subtitle: 'Admin Panels & Technical Specs',
    description:
      'Mengembangkan sistem manajemen konten kustom sekaligus menyusun dokumentasi teknis terstruktur untuk kebutuhan instansi maupun korporat.',
    icon: FileCode2,
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 border-emerald-100',
    skills: [
      'Filament PHP',
      'Voyager Admin',
      'System Analysis',
      'Technical Proposal',
      'Workflow Digitization',
    ],
    deliverables: [
      'Custom Enterprise Admin Dashboards',
      'Digital Library & Document Workflows',
      'End-to-End System Blueprints',
    ],
  },
  {
    id: 'devops-tools',
    title: 'Deployment & Dev Workflow',
    subtitle: 'Environment, CI/CD & Version Control',
    description:
      'Mengelola alur pengembangan kolaboratif, kontainerisasi lingkungan aplikasi, hingga proses deployment ke server produksi.',
    icon: Terminal,
    accentColor: 'text-slate-700',
    badgeBg: 'bg-slate-100 border-slate-200',
    skills: [
      'Git & GitHub',
      'Docker',
      'Vercel',
      'cPanel',
      'Laragon',
      'Vite',
    ],
    deliverables: [
      'Automated Cloud Deployment',
      'Local & Containerized Environments',
      'Clean Version Control & Code Review',
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="skills"
      className="py-24 bg-white text-slate-900 px-6 sm:px-8 border-t border-slate-100"
    >
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Capabilities & Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Tech Stack & Core Expertise
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-600 max-w-xl text-sm sm:text-base md:text-right text-left">
            Kombinasi teknologi modern yang saya gunakan untuk merancang, membangun, dan memelihara produk digital dari nol hingga produksi.
          </p>
        </div>

        {/* Bento Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CAPABILITIES.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="group rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:border-blue-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Icon + Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${group.badgeBg} ${group.accentColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                          {group.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {group.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Key Deliverables List */}
                  <ul className="mt-5 space-y-2 border-t border-slate-200/60 pt-4">
                    {group.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <Check className={`w-3.5 h-3.5 shrink-0 ${group.accentColor}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-5 border-t border-slate-200/60">
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200/80 text-slate-700 text-xs font-mono shadow-2xs group-hover:border-slate-300 transition-colors"
                      >
                        {skill}
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
  );
}