import Image from "next/image";

import globe from "@/images/globe.png";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex justify-center items-end">
        <Image src={globe} alt="Globe" className="w-full max-w-4xl object-contain translate-y-1/3" />
      </div>
      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Job Today</h1>
        <p className="text-lg text-zinc-400 mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
        </p>
      </div>
    </main>
  );
}
