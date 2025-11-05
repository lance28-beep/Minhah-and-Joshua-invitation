"use client"

import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Bride",
  "Parents of the Groom",
  "Maid/Matron of Honor",
  "Best Man",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Bridesmaids",
  "Groomsmen",
  "Flower Girls",
  "Ring/Coin Bearers",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white tracking-wide">
        {children}
      </h3>
      <div className="mx-auto mt-2 sm:mt-3 h-[2px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-[#8096AE] via-white/70 to-[#818D77]" />
    </div>
  )

  // Helper component for name items with role title
  const NameItem = ({ member }: { member: EntourageMember }) => (
    <div className="group relative rounded-xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)] focus-within:ring-2 focus-within:ring-[#8096AE]/60">
      {/* glass micro-card */}
      <div className="absolute inset-0 rounded-xl bg-white/5" />
      <div className="absolute inset-px rounded-[calc(0.75rem-1px)] border border-white/10" />
      <div className="relative flex flex-col items-center">
        <p className="text-white text-sm sm:text-base md:text-lg font-medium text-center tracking-wide">
          {member.Name}
        </p>
        {member.RoleTitle && (
          <p className="text-white/70 text-[11px] sm:text-xs font-light text-center mt-1">
            {member.RoleTitle}
          </p>
        )}
      </div>
      {/* sheen on hover */}
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
          <div className="relative rounded-2xl bg-[#818D77]/20 border border-[#818D77] backdrop-blur-md p-4 sm:p-6 lg:p-7 overflow-hidden ring-1 ring-[#8096AE]/50 hover:ring-[#8096AE]/70 transition-colors hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            {/* glass effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-white/5" />
              <div className="absolute inset-px rounded-[calc(1rem-1px)] border border-white/10" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
            {/* corner botanical strokes */}
            <svg className="absolute -top-2 -left-2 w-28 opacity-25" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1">
              <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
            </svg>
            <svg className="absolute -bottom-2 -right-2 w-28 opacity-25 rotate-180" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1">
              <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
            </svg>
            <SectionTitle>{singleTitle}</SectionTitle>
            <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2.5 sm:gap-y-3.5 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
              {children}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="relative rounded-2xl bg-[#818D77]/20 border border-[#818D77] backdrop-blur-md p-4 sm:p-6 lg:p-7 overflow-hidden ring-1 ring-[#8096AE]/50 hover:ring-[#8096AE]/70 transition-colors hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          {/* glass effect */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-white/5" />
            <div className="absolute inset-px rounded-[calc(1rem-1px)] border border-white/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          {/* corner botanical strokes */}
          <svg className="absolute -top-2 -left-2 w-28 opacity-25" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1">
            <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
          </svg>
          <svg className="absolute -bottom-2 -right-2 w-28 opacity-25 rotate-180" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1">
            <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
          </svg>
          <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-5 md:gap-x-8 mb-3 sm:mb-5">
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
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 overflow-hidden bg-transparent"
    >
      {/* Corner decoration */}
      <img
        src="/decoration/bottom-righ-corner-flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 lg:w-80 opacity-90"
      />
      <img
        src="/decoration/bottom-righ-corner-flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 lg:w-80 opacity-90 -scale-x-100"
      />
      <img
        src="/decoration/bottom-righ-corner-flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 right-0 w-36 sm:w-52 md:w-64 lg:w-72 opacity-80 -scale-y-100"
      />
      <img
        src="/decoration/bottom-righ-corner-flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-0 w-36 sm:w-52 md:w-64 lg:w-72 opacity-80 -scale-x-100 -scale-y-100"
      />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16">
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

        {/* Primary titles */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 text-balance drop-shadow-2xl">
          Wedding Entourage
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-white/85 mb-8">
          Organizational Chart
        </h3>

        {/* Couple highlight removed per request */}

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-[#818D77]/40" />
          <div className="w-1 h-1 bg-white/80 rounded-full" />
          <div className="w-12 h-px bg-[#818D77]/40" />
        </div>
      </div>

      {/* Enhanced entourage content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-white" />
                <span className="text-white font-serif text-lg">Loading entourage...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <p className="text-white font-serif text-lg mb-2">{error}</p>
                <button
                  onClick={fetchEntourage}
                  className="text-white hover:text-[#818D77] font-serif underline"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : entourage.length === 0 ? (
            <div className="text-center py-24">
              <Users className="h-16 w-16 text-white/70 mx-auto mb-4" />
              <p className="text-white font-serif text-lg">No entourage members yet</p>
            </div>
          ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-4 mb-8">
                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="flex flex-col items-center">
                          <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Bride</p>
                          {bride && (
                            <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">{bride.Name}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-[#CDAC77] text-xs sm:text-sm mb-1 font-light">Groom</p>
                          {groom && (
                            <p className="text-[#FFF6E7] text-base sm:text-lg font-medium">{groom.Name}</p>
                          )}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Only render once (when processing "Parents of the Bride")
                  if (category === "Parents of the Bride") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Bride" rightTitle="Parents of the Groom">
                          <div className="space-y-3">
                            {parentsBride.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {parentsGroom.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Groom" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Maid/Matron of Honor")
                  if (category === "Maid/Matron of Honor") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Maid/Matron of Honor" rightTitle="Best Man">
                          <div className="space-y-3">
                            {maidOfHonor.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {bestMan.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Best Man" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Bridesmaids" rightTitle="Groomsmen">
                          <div className="space-y-3">
                            {bridesmaids.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {groomsmen.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-4 mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          <div className="space-y-3">
                            {candleSponsors.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                          <div className="space-y-3">
                            {veilSponsors.map((member, idx) => (
                              <NameItem key={idx} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-4 mb-8">
                        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={idx}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-4 mb-8">
                      <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={idx}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
