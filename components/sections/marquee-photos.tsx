"use client"

import Image from "next/image"
import React from "react"
import { siteConfig } from "@/content/site"

const photos = [
  "/Couple_img/couple (1).png",
  "/Couple_img/couple (2).png",
  "/Couple_img/couple (3).png",
  "/Couple_img/couple (4).png",
  "/Couple_img/couple (5).png",
  "/Couple_img/couple (6).png",
  "/Couple_img/couple (7).png",
  "/Couple_img/couple (8).png",
]

export function MarqueePhotos() {

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#8096AE] to-[#818D77] py-16 sm:py-20">
      {/* Corner decorations */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/decoration/corner_right-top.png"
          alt="decor top right"
          width={220}
          height={220}
          className="absolute right-0 top-0 h-auto w-40 sm:w-52 opacity-80"
          priority
        />
        <Image
          src="/decoration/flower-bg-left-down.png"
          alt="decor bottom left"
          width={260}
          height={260}
          className="absolute left-0 bottom-0 h-auto w-44 sm:w-64 opacity-80"
          priority
        />
      </div>

      {/* Heading */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <span aria-hidden>✦</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-white drop-shadow-sm">
              {siteConfig.couple.groom} and {siteConfig.couple.bride}
            </h2>
            <span aria-hidden>✦</span>
          </div>
          <p className="mt-3 text-xs tracking-[0.2em] text-white/80 sm:text-sm">
            {siteConfig.wedding.date.toUpperCase()}
          </p>
        </div>

        {/* Marquee */}
        <div className="group relative">
          <div
            className="relative overflow-hidden touch-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          >
            <div className="marquee-track flex gap-4 sm:gap-6 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
              {[...photos, ...photos].map((src, idx) => (
                <PhoneFrame key={`${src}-${idx}`}>
                  <Image
                    src={src}
                    alt={`Couple ${idx % photos.length + 1}`}
                    width={480}
                    height={960}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 320px"
                    priority={idx < 3}
                  />
                </PhoneFrame>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="phone-frame relative h-[340px] w-[200px] sm:h-[420px] sm:w-[250px] md:h-[520px] md:w-[300px] shrink-0 rounded-[2.25rem] bg-white p-2 transition-transform duration-300 ease-out hover:-rotate-1 hover:scale-[1.01]"
      style={{ boxShadow: "0 2px 0 0 #000, 0 0 0 2px #000" }}
    >
      {/* Camera dot */}
      <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-black" />
      {/* Inner border */}
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border-2 border-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  )
}

export default MarqueePhotos


