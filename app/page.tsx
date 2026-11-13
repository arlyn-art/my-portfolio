import Hero from "@/components/home/hero"; 
import SelectedProjects from "@/components/home/selectedProjects";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <SelectedProjects />
    </main>
  );
}