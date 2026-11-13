'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 sm:pb-12 pb-[7rem] px-4 transition-colors">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800">
          
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Arlyn Arta Pradipa
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
              Full Stack & Mobile Developer yang berfokus pada pembuatan solusi digital berkualitas tinggi, kode bersih, dan performa optimal.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/arlyn-art" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 shadow-xs transition"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/arlyn-arta-pradipa-6b8102152/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 shadow-xs transition"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>

            <a 
              href="mailto:arlynartapradipa9c@gmail.com" 
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 shadow-xs transition"
            >
              <i className="fas fa-envelope text-lg"></i>
            </a>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Arlyn Arta Pradipa. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          </div>
        </div>

      </div>
    </footer>
  );
}