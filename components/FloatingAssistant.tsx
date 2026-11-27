'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  X,
  ChevronDown,
  Send,
  LayoutGrid,
  Bot,
  Sparkles,
  Mail,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

const QUICK_QUESTIONS = [
  'Tech stack utama?',
  'Open untuk proyek / hire?',
  'Pengalaman kerja?',
  'Kontak & WhatsApp',
];

function getKeywordReply(input: string): {
  text: string;
  action?: { label: string; href: string; external?: boolean };
} {
  const q = input.toLowerCase();

  if (q.includes('halo') || q.includes('hai') || q.includes('hi') || q.includes('pagi') || q.includes('siang') || q.includes('sore') || q.includes('malam')) {
    return {
      text: 'Halo! 👋 Saya asisten virtual Arlyn. Ada yang ingin ditanyakan seputar proyek, tech stack, pengalaman kerja, atau kolaborasi?',
    };
  }

  if (q.includes('stack') || q.includes('tech') || q.includes('teknologi') || q.includes('bahasa') || q.includes('framework')) {
    return {
      text: 'Arlyn berfokus pada pengembangan Full Stack & Mobile menggunakan Next.js, React, TypeScript, Laravel, Filament PHP, Vue 3, Tailwind CSS, MySQL, dan Flutter.',
      action: { label: 'Lihat Daftar Proyek', href: '/projects' },
    };
  }

  if (q.includes('hire') || q.includes('kerja') || q.includes('freelance') || q.includes('open') || q.includes('tersedia') || q.includes('available') || q.includes('bikin') || q.includes('buat')) {
    return {
      text: 'Saat ini Arlyn terbuka untuk diskusi proyek freelance (Web/Mobile App) maupun peluang kolaborasi profesional. Silakan kirim detail kebutuhanmu lewat form kontak atau WhatsApp!',
      action: { label: 'Ke Halaman Contact', href: '/contact' },
    };
  }

  if (q.includes('pengalaman') || q.includes('experience') || q.includes('karir') || q.includes('cv') || q.includes('perusahaan')) {
    return {
      text: 'Arlyn berkarier sebagai Full Stack Developer di PT Design Tiga Selaras (DesignCub3) dan menangani berbagai proyek aplikasi web komersial, dashboard korporat, serta cetak biru sistem.',
      action: { label: 'Lihat Journey & Karir', href: '/journey' },
    };
  }

  if (q.includes('proyek') || q.includes('project') || q.includes('portofolio') || q.includes('portfolio') || q.includes('karya')) {
    return {
      text: 'Ada 20+ proyek web komersial, aplikasi independen, hingga dokumen arsitektur sistem yang sudah dikembangkan. Kamu bisa menjelajahi semuanya di halaman Projects.',
      action: { label: 'Buka Galeri Proyek', href: '/projects' },
    };
  }

  if (q.includes('kontak') || q.includes('contact') || q.includes('wa') || q.includes('whatsapp') || q.includes('email') || q.includes('ig') || q.includes('instagram')) {
    return {
      text: 'Kamu bisa menghubungi Arlyn langsung via WhatsApp (+62 851-5650-5620), Instagram (@arlyn.arta), atau email arlynartapradipa9c@gmail.com.',
      action: {
        label: 'Chat WhatsApp',
        href: 'https://wa.me/6285156505620',
        external: true,
      },
    };
  }

  if (q.includes('lokasi') || q.includes('domisili') || q.includes('tinggal') || q.includes('alamat') || q.includes('jakarta')) {
    return {
      text: 'Arlyn berdomisili di Menteng Atas, Setiabudi, Jakarta Selatan, dan terbiasa bekerja secara onsite maupun remote.',
    };
  }

  if (q.includes('harga') || q.includes('biaya') || q.includes('rate') || q.includes('tarif')) {
    return {
      text: 'Estimasi biaya dan timeline sangat bergantung pada kompleksitas fitur sistem. Yuk diskusikan singkat kebutuhan proyekmu agar bisa diestimasikan dengan tepat!',
      action: { label: 'Diskusi Proyek', href: '/contact' },
    };
  }

  return {
    text: 'Pertanyaan yang menarik! Untuk diskusi lebih spesifik, kamu bisa langsung terhubung lewat tab Channels atau tinggalkan pesan ke email Arlyn.',
    action: { label: 'Kirim Pesan Langsung', href: '/contact' },
  };
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'channels'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo! 👋 Ada yang bisa saya bantu seputar portofolio, tech stack, atau kerja sama proyek dengan Arlyn?',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  const handleSendMessage = (rawText?: string) => {
    const text = (rawText ?? inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!rawText) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getKeywordReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        action: reply.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('arlynartapradipa9c@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed bottom-6 md:bottom-8 right-5 sm:right-6 z-50 flex flex-col items-end">
      {/* GLASSY POPOVER PANEL */}
      <div
        className={`w-[calc(100vw-2.5rem)] sm:w-96 h-[470px] rounded-3xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col mb-4 origin-bottom-right transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-6 pointer-events-none'
        }`}
      >
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-700 p-5 text-white relative shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold leading-tight">
                    Arlyn&apos;s Assistant
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs text-blue-100/80 mt-0.5">
                  Tanya cepat atau hubungi langsung
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup widget"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BODY CONTENT */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 [scrollbar-width:thin]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white/90 border border-slate-200/80 text-slate-700 rounded-bl-sm'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        {msg.action.external ? (
                          <a
                            href={msg.action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={msg.action.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white/90 border border-slate-200/80 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-3.5 py-2 border-t border-slate-200/60 bg-white/60 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-[11px] font-medium text-slate-600 hover:text-blue-600 whitespace-nowrap transition cursor-pointer shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 bg-white/90 border-t border-slate-200/70 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik kata kunci (mis. stack, proyek)..."
                className="flex-1 bg-slate-100/80 focus:bg-white border border-transparent focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Kirim pesan"
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* TAB CHANNELS */
          <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-3">
            <p className="text-xs font-medium text-slate-500 mb-1">
              Terhubung langsung melalui kanal komunikasi berikut:
            </p>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6285156505620"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white/90 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition group-hover:scale-105">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    WhatsApp Chat
                  </h4>
                  <p className="text-xs font-mono text-slate-500">+62 851-5650-5620</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/arlyn.arta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-white/90 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-pink-300 transition shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-50 via-pink-50 to-purple-50 text-pink-600 flex items-center justify-center transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition">
                    Instagram DM
                  </h4>
                  <p className="text-xs font-mono text-slate-500">@arlyn.arta</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-600 transition" />
            </a>

            {/* Email + Copy */}
            <div className="flex items-center justify-between p-3.5 bg-white/90 rounded-2xl border border-slate-200/80 shadow-2xs">
              <a
                href="mailto:arlynartapradipa9c@gmail.com"
                className="flex items-center gap-3 min-w-0 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition group-hover:scale-105">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Direct Email
                  </h4>
                  <p className="text-xs font-mono text-slate-500 truncate">
                    arlynartapradipa9c@gmail.com
                  </p>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Salin Email"
                className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM TAB BAR */}
        <div className="border-t border-slate-200/70 p-1.5 grid grid-cols-2 gap-1.5 bg-white/90 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Assistant</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('channels')}
            className={`py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition cursor-pointer ${
              activeTab === 'channels'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Channels</span>
          </button>
        </div>
      </div>

      {/* FLOATING TRIGGER BUTTON (Animasi Pulse Tetap Dipertahankan) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Tutup asisten' : 'Buka asisten'}
        className={`w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
          !isOpen ? 'animate-custom-pulse' : ''
        }`}
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}