'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [phase, setPhase] = useState<'typing' | 'running' | 'preview'>('typing');
  const [typedCode, setTypedCode] = useState('');
  
  const [projectCount, setProjectCount] = useState(0);
  const [yearCount, setYearCount] = useState(0);
  const [percentCount, setPercentCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const codeSnippet = `<div id="profile">\n  <h1>Hi, I'm Arlyn</h1>\n  <p>Full Stack Software Developer</p>\n</div>`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'typing') {
      let index = 0;
      setTypedCode('');
      
      const interval = setInterval(() => {
        if (index <= codeSnippet.length) {
          setTypedCode(codeSnippet.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setPhase('running');
          }, 1000);
        }
      }, 50); 
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else if (phase === 'running') {
      timeout = setTimeout(() => {
        setPhase('preview');
      }, 800);

      return () => clearTimeout(timeout);
    } else if (phase === 'preview') {
      timeout = setTimeout(() => {
        setPhase('typing');
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [phase]);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500; 
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setProjectCount(Math.floor(progress * 10));
      setYearCount(Math.floor(progress * 4));
      setPercentCount(Math.floor(progress * 100));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-white text-slate-900 flex items-center py-16 lg:py-0 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-75 w-75 md:h-150 md:w-150 rounded-full bg-blue-400 opacity-15 blur-[100px] md:blur-[180px] pointer-events-none"></div>
      
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
              backgroundImage: `
                  linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
          }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className={`text-left order-1 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Available for Full-Time & Freelance</span>
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight wrap-break-word tracking-tight text-slate-900">
                Hi, I'm <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Arlyn Arta</span>
            </h1>

            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700">
                Full Stack Software Developer
            </h2>
            
            <p className="mt-3 text-sm sm:text-base font-mono font-medium text-blue-600">
                Laravel • Next.js • React • Mobile Apps
            </p>

            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
                Membangun aplikasi web dan mobile yang modern, responsif, dan berperforma tinggi dengan arsitektur backend yang tangguh, kode bersih, serta pengalaman pengguna yang optimal.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="/assets/pdf/cv.pdf" target="_blank" rel="noopener noreferrer"
                    className="text-center rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold transition hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20">
                    Unduh CV Profesional
                </a>
                <a href="#projects"
                    className="text-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
                    Lihat Portofolio
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 border-t border-slate-200 pt-8">
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{projectCount}+</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">Proyek Selesai</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{yearCount}+</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">Tahun Pengalaman</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{percentCount}%</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">Dedikasi Kode</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Fast</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">Response Time</p>
                </div>
            </div>
          </div>

          <div className={`flex justify-center order-2 w-full transition-all duration-700 delay-150 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="relative w-full max-w-120 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl p-5 shadow-2xl shadow-slate-200 overflow-hidden">
                  
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <div className="flex gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-400"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                          <span className="w-3 h-3 rounded-full bg-green-400"></span>
                      </div>
                      <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                          <span>portfolio.tsx</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            phase === 'typing' ? 'bg-blue-100 text-blue-700' :
                            phase === 'running' ? 'bg-yellow-100 text-yellow-700 animate-pulse' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {phase === 'typing' ? 'Writing code...' : phase === 'running' ? 'Running...' : 'Live Preview'}
                          </span>
                      </div>
                  </div>

                  <div className="min-h-55 flex flex-col justify-between">
                      
                      {phase !== 'preview' ? (
                        <div className="space-y-4">
                            <div className="font-mono text-xs sm:text-sm leading-relaxed text-slate-800 p-3 rounded-xl bg-slate-50 border border-slate-200 overflow-x-auto shadow-inner">
                                <pre className="whitespace-pre-wrap"><code>{typedCode}</code><span className="animate-pulse text-blue-600">_</span></pre>
                            </div>

                            <div className="flex justify-end">
                                <div className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
                                    phase === 'running' 
                                    ? 'bg-green-600 text-white scale-95 shadow-lg shadow-green-600/30' 
                                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                                }`}>
                                    <i className={`fas ${phase === 'running' ? 'fa-spinner fa-spin' : 'fa-play'} text-xs`}></i>
                                    <span>{phase === 'running' ? 'Compiling...' : 'Run Code'}</span>
                                </div>
                            </div>
                        </div>
                      ) : (
                        <div className="animate-fadeIn rounded-xl bg-slate-50 border border-blue-200 p-6 text-center space-y-4 shadow-inner">
                            <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-1">
                                <i className="fas fa-check-circle text-2xl"></i>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900">Hi, I'm Arlyn</h3>
                                <p className="text-sm text-slate-600">Full Stack Software Developer</p>
                            </div>
                            <div className="pt-2 flex justify-center gap-2">
                                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-blue-600 font-mono shadow-xs">React / Next.js</span>
                                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-cyan-600 font-mono shadow-xs">Mobile Apps</span>
                            </div>
                        </div>
                      )}

                      <div className="rounded-xl bg-slate-50 p-3.5 mt-4 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                              <span className="text-xs text-slate-600 font-medium">Status: Ready for deployment</span>
                          </div>
                          {/* <span className="text-[11px] font-mono text-slate-400">v2.6.0</span> */}
                      </div>

                  </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}