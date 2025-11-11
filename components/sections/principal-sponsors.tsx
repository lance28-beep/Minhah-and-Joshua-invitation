"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`anton-regular text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase text-[#BB8A3D] mb-2 sm:mb-3 md:mb-4 tracking-[0.15em] ${textAlign} ${className}`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2 w-full`}>
        <p className={`text-slate-700 text-[13px] sm:text-sm md:text-base font-medium leading-snug break-words ${textAlign}`}>{name}</p>
      </div>
    )
  }

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2.5 sm:mb-3.5 md:mb-5">
          {leftTitle && (
            <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Floating geometric shapes with color palette - hidden on small screens */}
        <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-[#B08981]/12 rounded-full blur-xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-16 h-16 bg-[#EFBFBB]/18 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="hidden sm:block absolute bottom-20 left-20 w-24 h-24 bg-[#B08981]/10 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="hidden sm:block absolute bottom-10 right-10 w-12 h-12 bg-[#EFBFBB]/16 rounded-full blur-lg animate-pulse delay-500" />

        {/* Smaller mobile decorative elements */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#B08981]/10 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#EFBFBB]/12 rounded-full blur-md animate-pulse delay-1000" />

        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08981]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent" />
        
        {/* Corner decorative elements with color palette - reduced on mobile */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 text-balance">
          Principal Sponsors
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#F1EDE2] mb-3 sm:mb-4">
          Our Beloved Godparents
        </h3>
      </div>

      {/* Sponsors content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* White card with elegant border */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#F1EDE2] rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Global font for Anton to match Entourage section */}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
              .anton-regular {
                font-family: "Anton", sans-serif;
                font-weight: 400;
                font-style: normal;
              }
            `}</style>
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#F1EDE2]/30 border-t-[#F1EDE2] rounded-full animate-spin" />
                    <span className="text-[#AFC8E6] font-serif text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#AFC8E6] hover:text-[#D8B0B0] font-serif underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-[#AFC8E6] font-serif text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2.5 sm:mb-3.5 md:mb-5">
                    <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <div className="contents" key={`pair-${idx}`}>
                        <div className="px-3 sm:px-4 md:px-6">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-1 sm:py-1.5 md:py-2" />
                          )}
                        </div>
                        <div className="px-3 sm:px-4 md:px-6">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-1 sm:py-1.5 md:py-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
