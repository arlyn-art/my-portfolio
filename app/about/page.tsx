export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Tentang Saya</h1>
      <p className="text-slate-400 max-w-md">
        Halo! Ketika kamu mengklik menu "About" di atas, halaman ini berubah, tapi Navbar dan Footer di luar tetap sama persis!
      </p>
    </div>
  );
}