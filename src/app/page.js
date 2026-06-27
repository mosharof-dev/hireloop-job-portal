import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <FeaturedJobs />
    </main>
  );
}
