'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FolderGit2, Compass, LucideIcon } from 'lucide-react';

// Tipe data untuk setiap item menu
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Daftar menu default (bisa juga di-override lewat props jika dibutuhkan)
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Projects', href: '/projects', icon: FolderGit2 },
  { label: 'Journey', href: '/journey', icon: Compass },
];

interface NavbarProps {
  items?: NavItem[];
}

export default function Navbar({ items = DEFAULT_NAV_ITEMS }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const pathname = usePathname(); // Untuk cek menu mana yang sedang aktif

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 20) {
        setIsScrolled(true);
        timer = setTimeout(() => {
          setShowBorder(true);
        }, 300);
      } else {
        clearTimeout(timer);
        setIsScrolled(false);
        setShowBorder(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Top Navbar (Desktop & Mobile Header) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-0 transition-all duration-300 ${
          isScrolled ? 'bg-none' : 'bg-white border-b border-slate-200 backdrop-blur-md'
        }`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'max-w-6xl mt-3 mx-4 rounded-full relative p-1 overflow-hidden shadow-xl'
              : 'container mt-0 rounded-none px-6 sm:px-8 py-4 bg-white'
          }`}
        >
          {/* Animasi Border Berputar saat di-scroll */}
          {isScrolled && showBorder && (
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <span className="absolute animate-[spin_8s_linear_infinite] inset-[-500%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_180deg,#2563eb_270deg,#60a5fa_360deg)]" />
            </div>
          )}

          <div
            className={`w-full flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'bg-white rounded-full px-6 py-2.5 relative z-10' : 'px-0'
            }`}
          >
            {/* Brand / Profile */}
            <div className="flex items-center gap-3">
              <Link href="/" className="group flex items-center gap-3">
                <img
                  src="/assets/images/foto-profile.jpg"
                  alt="Arlyn"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 group-hover:scale-105 transition"
                />
                <div>
                  <h2 className="font-bold text-slate-900 leading-tight">Arlyn</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Full Stack Developer</p>
                </div>
              </Link>
            </div>

            {/* Menu Links Desktop (Looping dari array items) */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-8 font-medium">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`transition relative py-1 ${
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                      {/* Garis indikator kecil di bawah menu aktif */}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="hidden sm:flex items-center gap-4 text-slate-700 border-l border-slate-200 pl-6">
                <a
                  href="https://github.com/arlyn-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/arlyn-arta-pradipa-6b8102152/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Floating Navigation (Mobile & Tablet) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-50 w-[90%] max-w-sm">
        <div className="flex items-center justify-around rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xl px-2 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}