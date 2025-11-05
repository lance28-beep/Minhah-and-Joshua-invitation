"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests
      const attendingGuests = data.filter((guest) => guest.RSVP === "Yes")
      
      setGuests(attendingGuests)
      setTotalGuests(attendingGuests.length)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative bg-[#8096AE] py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#818D77]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#8096AE]/25 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#818D77]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#8096AE]/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-[#818D77]/30" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-[#818D77]/25" />
        
        {/* Decorative corner images (all corners) */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 sm:w-44 md:w-56 lg:w-64 opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-70 rotate-180 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-80 -scale-x-100 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-80 -scale-y-100 select-none"
        />
      </div>

      {/* Enhanced title section */}
      <div className="relative z-10 text-center mb-8 md:mb-20">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-[#D0D2D1]/60" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#8096AE] rounded-full" />
            <div className="w-1 h-1 bg-[#B8B8B8] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#8096AE] rounded-full" />
          </div>
          <div className="w-16 h-px bg-[#D0D2D1]/60" />
        </div>

        <div className="inline-flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
          <Sparkles className="text-[#FFF6E7]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" />
          <span className="text-[#FFF6E7]/80 font-lora text-xs md:text-sm uppercase tracking-wider">Guest Registry</span>
          <Sparkles className="text-[#FFF6E7]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <h2 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-3 md:mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 text-white">Book of Guests</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#B8B8B8]/30 blur-2xl -z-10">Book of Guests</span>
        </h2>
        
        <p className="text-sm md:text-xl text-[#FFF6E7]/90 font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
          See who's celebrating with us on our special day
        </p>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-[#818D77]/40" />
          <div className="w-1 h-1 bg-[#818D77] rounded-full" />
          <div className="w-12 h-px bg-[#818D77]/40" />
        </div>
      </div>

      {/* Enhanced guests content */}
      <div className="relative z-10">
        {/* Premium stats card */}
        <div className="text-center mb-6 sm:mb-12 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative max-w-3xl mx-auto">
            {/* Main card */}
            <div className="relative bg-[#8096AE]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#818D77] shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-1 ring-[#8096AE]/40">
              {/* Decorative corner accents */}
              
              
              {/* Inner decorative border */}
              <div className="absolute inset-2 border border-[#818D77]/40 rounded-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-1 md:gap-3 mb-2 md:mb-4">
                  <div className="bg-gradient-to-r from-[#8096AE] to-[#818D77] p-1 md:p-3 rounded-full shadow-lg">
                    <Heart className="text-white h-3 w-3 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-sm sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                    {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                  </h3>
                </div>
                <p className="text-xs sm:text-base md:text-lg text-white/80 font-lora leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative bg-[#8096AE]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-2 border-[#818D77] ring-1 ring-[#8096AE]/40">
            {/* Decorative corner accents */}
            
            
            {/* Inner decorative border */}
            <div className="absolute inset-2 border border-[#818D77]/40 rounded-xl" />
            {isLoading ? (
              <div className="flex items-center justify-center h-24 sm:h-48">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="relative">
                    <Loader2 className="h-6 w-6 md:h-10 md:w-10 animate-spin text-[#402921]" />
                    <div className="absolute inset-0 h-6 w-6 md:h-10 md:w-10 animate-ping rounded-full bg-[#BB8A3D]/25"></div>
                  </div>
                  <span className="text-[#402921] font-lora text-xs md:text-lg font-medium">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-24 sm:h-48 text-red-500">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="bg-red-100 p-2 md:p-4 rounded-full">
                    <MessageSquare className="h-5 w-5 md:h-8 md:w-8 text-red-500" />
                  </div>
                  <span className="font-lora text-xs md:text-lg">{error}</span>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-10 sm:py-16">
                <div className="relative text-center bg-[#8096AE] rounded-2xl px-6 sm:px-10 py-8 sm:py-12 shadow-2xl border border-white/20 max-w-xl w-full">
                  {/* Decorative glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-xl opacity-30 pointer-events-none" />
                  <div className="relative">
                      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-60" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-[#FFF6E7]" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-playfair font-bold text-[#FFF6E7] mb-2 sm:mb-3">
                      No guests have RSVP'd yet
                    </h3>
                    <p className="text-xs sm:text-base text-[#FFF6E7]/90 font-lora max-w-md mx-auto leading-relaxed">
                      Be the first to RSVP and kick off the celebration!
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-white text-[#0f172a] rounded-full px-3 sm:px-5 py-1.5 sm:py-2 shadow-md">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs sm:text-sm font-lora">Search your name to RSVP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-6 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Main card - pure white, elegant border, subtle florals */}
                    <div className={`group relative p-3 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border-[#D0D2D1] ring-1 ring-[#8096AE]/20 hover:ring-[#8096AE]/40`}>
                      {/* Corner floral lines */}
                      <svg className="pointer-events-none absolute -top-1 -left-1 w-24 sm:w-28 md:w-32 opacity-20" viewBox="0 0 200 200" fill="none" stroke="#8096AE" strokeWidth="1">
                        <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
                      </svg>
                      <svg className="pointer-events-none absolute -top-1 -right-1 w-24 sm:w-28 md:w-32 opacity-20 -scale-x-100" viewBox="0 0 200 200" fill="none" stroke="#8096AE" strokeWidth="1">
                        <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
                      </svg>
                      <svg className="pointer-events-none absolute -bottom-1 -left-1 w-24 sm:w-28 md:w-32 opacity-20 -scale-y-100" viewBox="0 0 200 200" fill="none" stroke="#818D77" strokeWidth="1">
                        <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
                      </svg>
                      <svg className="pointer-events-none absolute -bottom-1 -right-1 w-24 sm:w-28 md:w-32 opacity-20 rotate-180" viewBox="0 0 200 200" fill="none" stroke="#818D77" strokeWidth="1">
                        <path d="M10 150 C 40 120, 60 80, 100 60 C 140 40, 160 30, 190 10"/>
                      </svg>
                    
                    <div className="flex flex-col gap-2 sm:gap-4">
                      {/* Header section */}
                      <div className="flex items-start gap-2 sm:gap-3">
                        {/* Avatar */}
                        <div className="relative h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0">
                          <div className="h-full w-full rounded-full bg-gradient-to-br from-[#8096AE] to-[#818D77] text-white flex items-center justify-center font-semibold shadow-md ring-2 ring-[#818D77] text-xs sm:text-base">
                            {getInitials(guest.Name)}
                          </div>
                        </div>
                        
                        {/* Name and Email */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                              <h4 className="font-lora text-[#0f172a] text-sm sm:text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-[#8096AE]">
                              {guest.Name}
                            </h4>
                          </div>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-xs sm:text-sm text-[#334155] mt-0.5 sm:mt-1">
                                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#8096AE] flex-shrink-0" />
                                <span className="font-lora break-all truncate text-xs sm:text-sm">{guest.Email}</span>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-[#D0D2D1]" />

                      {/* Premium message section */}
                      {guest.Message && (
                        <div className="relative">
                          <div className="bg-[#818D77]/10 rounded-lg sm:rounded-xl p-2 sm:p-4 border-2 border-[#818D77]/30">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="bg-[#818D77] p-1 sm:p-2 rounded-full flex-shrink-0">
                                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs sm:text-base text-[#0f172a] font-lora leading-relaxed italic">
                                  "{guest.Message}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer with guest number */}
                      <div className="flex items-center justify-end pt-1 sm:pt-2 border-t border-[#D0D2D1]">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 sm:h-3 sm:w-3 text-[#818D77]" />
                          <span className="text-xs text-[#334155] font-lora">Guest #{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
