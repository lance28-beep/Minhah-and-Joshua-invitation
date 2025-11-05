"use client"

import { useEffect, useMemo, useState } from "react"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-white tracking-wide">
        {children}
      </h3>
      <div className="mx-auto mt-2 sm:mt-3 h-[2px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-[#8096AE] via-white/70 to-[#818D77]" />
    </div>
  )

  // Helper component for name items
  const NameItem = ({ name }: { name: string }) => (
    <div className="group relative rounded-xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 rounded-xl bg-white/5" />
      <div className="absolute inset-px rounded-[calc(0.75rem-1px)] border border-white/10" />
      <p className="relative text-white text-sm sm:text-base font-light text-center tracking-wide">{name}</p>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.06)_40%,transparent_60%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    </div>
  )

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
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 mb-4 sm:mb-6">
          {leftTitle && (
            <SectionTitle>{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle>{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2.5 sm:gap-y-3.5 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
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

  // Split columns
  const maleSponsors = useMemo(() => sponsors.map((s) => s.MalePrincipalSponsor).filter(Boolean), [sponsors])
  const femaleSponsors = useMemo(() => sponsors.map((s) => s.FemalePrincipalSponsor).filter(Boolean), [sponsors])

  return (
    <section 
      id="sponsors" 
      className="relative bg-[#8096AE] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative background elements — same as Countdown */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes with color palette */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#818D77]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#B8B8B8]/15 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#D0D2D1]/8 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#818D77]/12 rounded-full blur-lg animate-pulse delay-500" />

        {/* Decorative lines with solid colors */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-[#D0D2D1]/30" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-[#B8B8B8]/25" />

        {/* Corner decorative images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-48 sm:w-56 md:w-72 lg:w-80 opacity-90 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-40 sm:w-52 md:w-64 lg:w-72 opacity-90 rotate-180 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-40 sm:w-52 md:w-64 lg:w-72 opacity-85 -scale-x-100 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-40 sm:w-52 md:w-64 lg:w-72 opacity-85 -scale-y-100 select-none"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Decorative ornaments */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-px bg-[#818D77]/60" />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white/80 rounded-full self-center" />
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="w-16 h-px bg-[#818D77]/60" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg relative">
            <span className="relative z-10">Principal Sponsors</span>
          </h2>

          <p className="text-lg md:text-xl text-white font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
            Our Beloved Godparents
          </p>

          {/* Bottom decorative ornaments */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
            <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          </div>
        </div>

        {/* Sponsors in Two-Column Layout */}
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white font-serif">Loading sponsors...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 font-serif">{error}</p>
              <button onClick={fetchSponsors} className="underline text-white hover:text-[#818D77]">Try again</button>
            </div>
          ) : (
            <div className="relative rounded-2xl bg-[#8096AE]/15 border border-[#818D77] backdrop-blur-md p-5 sm:p-6 lg:p-7 ring-1 ring-[#8096AE]/50 hover:ring-[#8096AE]/70 transition-colors">
              <div className="pointer-events-none absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl bg-white/5" />
                <div className="absolute inset-px rounded-[calc(1rem-1px)] border border-white/10" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
              <TwoColumnLayout leftTitle="Male Principal Sponsors" rightTitle="Female Principal Sponsors">
              <div className="space-y-3">
                {maleSponsors.length === 0 ? (
                  <div className="py-2 sm:py-2.5">
                    <p className="text-white/80 text-sm text-center">No entries</p>
                  </div>
                ) : (
                  maleSponsors.map((name, idx) => (
                    <div key={idx}>
                      <NameItem name={name} />
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-3">
                {femaleSponsors.length === 0 ? (
                  <div className="py-2 sm:py-2.5">
                    <p className="text-white/80 text-sm text-center">No entries</p>
                  </div>
                ) : (
                  femaleSponsors.map((name, idx) => (
                    <div key={idx}>
                      <NameItem name={name} />
                    </div>
                  ))
                )}
              </div>
              </TwoColumnLayout>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
