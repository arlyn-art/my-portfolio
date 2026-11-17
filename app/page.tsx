import Hero from "@/components/home/hero"; 
import FeaturedProject from "@/components/home/FeaturedProject";
import SelectedProjects from "@/components/home/selectedProjects";
import TechStack from "@/components/home/TechStack";
import CareerSnapshot from "@/components/home/CareerSnapshot";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProject />
      <SelectedProjects />
      <TechStack />
      <CareerSnapshot />
      <CallToAction />
    </main>
  );
}