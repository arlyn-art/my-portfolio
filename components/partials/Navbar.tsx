import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-slate-800 text-white">
      <div className="font-bold text-lg">MyPortfolio</div>
      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-400 transition">About</Link>
      </div>
    </nav>
  );
}