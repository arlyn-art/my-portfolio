'use client';

import { useState } from 'react';
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Check,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

const QUICK_SUBJECTS = [
  'Web Application Project',
  'Mobile App (Flutter)',
  'Full-time / Contract Role',
  'System Architecture & Consultation',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'arlynartapradipa9c@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSelectQuickSubject = (topic: string) => {
    setFormData((prev) => ({ ...prev, subject: topic }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Menggunakan FormSubmit AJAX gratis langsung ke Gmail pribadi (tanpa backend)
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio] ${formData.subject}`,
          subject: formData.subject,
          message: formData.message,
          _template: 'table', // Format email masuk jadi rapi berbentuk tabel
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 pt-12 sm:pt-16 pb-24">
      {/* HEADER SECTION */}
      <section className="px-6 sm:px-8 pb-12 border-b border-slate-200/80 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-mono text-xs font-semibold tracking-wider uppercase mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Let&apos;s Build Something Great Together
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Punya ide aplikasi web, kebutuhan sistem bisnis, atau tawaran kolaborasi? Kirimkan pesan di bawah ini atau hubungi langsung melalui kontak yang tersedia.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: LEFT INFO + MAP & RIGHT FORM */}
      <section className="px-6 sm:px-8 pt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* KOLOM KIRI (5 Kolom): Info Kontak + Interactive Map */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Card Contact Info */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-mono text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Pilih saluran komunikasi yang paling nyaman untuk Anda.
                </p>

                <div className="mt-7 space-y-5">
                  {/* Location */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Location
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900 leading-snug">
                        Menteng Atas, Setiabudi, South Jakarta, Indonesia
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/6285156505620"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          WhatsApp
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                          +62 851-5650-5620
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 transition" />
                  </a>

                  {/* Email + Tombol Copy */}
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <a
                      href={`mailto:${emailAddress}`}
                      className="flex items-start gap-4 min-w-0 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Email
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600 truncate transition">
                          {emailAddress}
                        </p>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Salin Alamat Email"
                      className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 transition shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Response Time Footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Waktu respon rata-rata: kurang dari 24 jam (WIB / GMT+7)</span>
                </div>
              </div>

              {/* Card Google Maps */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Base Location • Jakarta Selatan
                  </span>
                  <span className="text-[11px] font-mono text-blue-600">6.2242° S, 106.8369° E</span>
                </div>
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2995408226904!2d106.8368812!3d-6.2241775!2m3!1f0!2f0!3f0!3m2!1i1025!2i768!4f13.1!3m3!1m2!1s0x2e69f3fb721f4c6b%3A0x6b663b6b8f108f92!2sMenteng%20Atas%2C%20Setiabudi%2C%20South%20Jakarta%20City!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                    title="Lokasi Menteng Atas, Setiabudi, Jakarta Selatan"
                    className="h-full w-full border-0 grayscale-[20%] contrast-[1.03]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>

            {/* KOLOM KANAN (7 Kolom): Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs"
              >
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Tell Me About Your Project
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Isi formulir di bawah ini dan pesan Anda akan langsung terkirim ke inbox email saya.
                </p>

                {/* Quick Subject Selector */}
                <div className="mt-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                    Quick Topic (Opsional)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SUBJECTS.map((topic) => {
                      const isSelected = formData.subject === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleSelectQuickSubject(topic)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="mt-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="nama@perusahaan.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                    >
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder="Diskusi Pembuatan Website / Aplikasi"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Ceritakan singkat tentang kebutuhan proyek, estimasi waktu, atau hal yang ingin didiskusikan..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Status Notification */}
                {status === 'success' && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pesan berhasil terkirim!</p>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda melalui email.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Gagal mengirim pesan</p>
                      <p className="text-xs text-rose-700 mt-0.5">
                        Terjadi kendala jaringan. Silakan coba lagi atau hubungi langsung lewat WhatsApp / Email di samping.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}