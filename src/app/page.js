import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import StatsSection from "@/components/home/StatsSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedJobs />
      <StatsSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}
