"use client";  // Tells Next.js to treat this file as a client-side component

import Hero from "@/components/ui/Hero";  // Default import

export default function Home() {
  return (
    <div>
      <Hero /> {/* Hero component */}
    </div>
  );
}
