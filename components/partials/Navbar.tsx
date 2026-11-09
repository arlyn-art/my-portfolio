'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

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
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-0 transition-all duration-300 
      ${isScrolled ? 'bg-none' : 'bg-white border-b border-border backdrop-blur-md'}`}>
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'max-w-6xl mt-3 rounded-full relative p-1 overflow-hidden shadow-xl'
              : 'container mt-0 rounded-none px-8 py-4 bg-white'
          }`}
        >
          {isScrolled && showBorder && (
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <span className="absolute animate-[spin_8s_linear_infinite] inset-[-500%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_180deg,#2563eb_270deg,#60a5fa_360deg)]" />
            </div>
          )}

          <div
            className={`w-full flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'bg-white rounded-full px-6 py-2.5 relative z-10'
                : 'px-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <Link href="/" className="group flex items-center gap-3">
                <img
                  src="/assets/images/foto-profile.jpg"
                  alt="Arlyn"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 group-hover:scale-105 transition"
                />
                <div>
                  <h2 className="font-bold text-gray-900 leading-tight">Arlyn</h2>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About
                </Link>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-gray-700">
                <a href="https://github.com/arlyn-art" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/arlyn-arta-pradipa-6b8102152/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 lg:hidden z-50">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-white/80 backdrop-blur-xl shadow-xl px-4 py-2">
          <Link href="/" className="flex flex-col items-center justify-center w-16 py-1 rounded-xl text-gray-600 hover:text-blue-600">
            <i className="fas fa-house text-lg"></i>
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/about" className="flex flex-col items-center justify-center w-16 py-1 rounded-xl text-gray-600 hover:text-blue-600">
            <i className="fas fa-user text-lg"></i>
            <span className="text-xs mt-1">About</span>
          </Link>
        </div>
      </nav>
    </>
  );
}