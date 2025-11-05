"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"

// Lazy load heavy components below the fold
const BackgroundMusic = dynamic(() => import("@/components/background-music"), { ssr: false })
const Silk = dynamic(() => import("@/components/silk"), { ssr: false })
const MarqueePhotos = dynamic(() => import("@/components/sections/marquee-photos").then(mod => ({ default: mod.MarqueePhotos })), { ssr: false })
const Countdown = dynamic(() => import("@/components/sections/countdown").then(mod => ({ default: mod.Countdown })), { ssr: false })
const Narrative = dynamic(() => import("@/components/sections/narrative").then(mod => ({ default: mod.Narrative })), { ssr: false })
const Gallery = dynamic(() => import("@/components/sections/gallery").then(mod => ({ default: mod.Gallery })), { ssr: false })
const Messages = dynamic(() => import("@/components/sections/messages").then(mod => ({ default: mod.Messages })), { ssr: false })
const Details = dynamic(() => import("@/components/sections/details").then(mod => ({ default: mod.Details })), { ssr: false })
const Entourage = dynamic(() => import("@/components/sections/entourage").then(mod => ({ default: mod.Entourage })), { ssr: false })
const PrincipalSponsors = dynamic(() => import("@/components/sections/principal-sponsors").then(mod => ({ default: mod.PrincipalSponsors })), { ssr: false })
const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })
const BookOfGuests = dynamic(() => import("@/components/sections/book-of-guests").then(mod => ({ default: mod.BookOfGuests })), { ssr: false })
const Registry = dynamic(() => import("@/components/sections/registry").then(mod => ({ default: mod.Registry })), { ssr: false })
const FAQ = dynamic(() => import("@/components/sections/faq").then(mod => ({ default: mod.FAQ })), { ssr: false })
const SnapShare = dynamic(() => import("@/components/sections/snap-share").then(mod => ({ default: mod.SnapShare })), { ssr: false })
const Footer = dynamic(() => import("@/components/sections/footer").then(mod => ({ default: mod.Footer })), { ssr: false })

export default function Home() {
  return (
    <main className="relative">
      <BackgroundMusic />
      {/* Silk Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
          <Silk speed={5} scale={1.1} color="#8D8E7C" noiseIntensity={0.8} rotation={0.3} />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <MarqueePhotos />
        <Countdown />
        <Narrative />
        <Gallery />
        <Messages />
        <Details />
        <Entourage />
        <PrincipalSponsors />
        <GuestList />
        <BookOfGuests />
        <Registry />
        <FAQ />
        <SnapShare />
        <Footer />
      </div>
    </main>
  )
}
