import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </div>
  );
}

