"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Shirt, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin, Facebook } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(null)
      }
    }
    
    if (showImageModal) {
      previousFocusRef.current = document.activeElement
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative bg-gradient-to-br from-[#8096AE] via-[#7e94ab] to-[#7a8ca0] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Enhanced Background with Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#818D77]/3 to-[#818D77]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#8096AE]/10 to-transparent" />
        
        {/* Animated floating orbs with staggered timing */}
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#818D77]/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-32 right-12 w-32 h-32 bg-[#B8B8B8]/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1.5s' }} />
        <div className="absolute bottom-24 left-1/4 w-36 h-36 bg-[#D0D2D1]/6 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '14s', animationDelay: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-[#8096AE]/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '2s' }} />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Elegant divider lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 via-white/25 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 via-white/25 to-transparent" />

        {/* Corner decorations */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-40 sm:w-52 md:w-64 lg:w-80 opacity-80 select-none pointer-events-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-36 sm:w-48 md:w-60 lg:w-72 opacity-70 -scale-x-100 select-none pointer-events-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-36 sm:w-48 md:w-60 lg:w-72 opacity-80 scale-y-[-1] select-none pointer-events-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-32 sm:w-44 md:w-56 lg:w-72 opacity-80 scale-x-[-1] scale-y-[-1] select-none pointer-events-none"
        />
      </div>

      {/* Section Header - Premium Typography */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-white/50 to-white/50" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white/90 rounded-full shadow-lg" />
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full self-center" />
            <div className="w-2 h-2 bg-white/90 rounded-full shadow-lg" />
          </div>
          <div className="h-px w-16 sm:w-20 md:w-24 bg-gradient-to-l from-transparent via-white/50 to-white/50" />
        </div>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-5 sm:mb-6 tracking-tight leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-white/95 bg-clip-text text-transparent">
            Event Details
          </span>
        </h2>
        
        <p className="text-[15px] sm:text-lg md:text-xl lg:text-2xl text-white/85 font-sans font-light max-w-3xl mx-auto leading-relaxed px-4">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Main Content - Enhanced Layout System */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
        
        {/* Venue Card - Premium Design */}
        <article className="relative">
          <div 
            className="bg-white/12 backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] overflow-hidden border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-700 hover:border-white/35 hover:-translate-y-1 group"
            onMouseEnter={() => setHoveredCard('venue')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Subtle inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Card Header with Enhanced Styling */}
            <header className="relative px-6 sm:px-8 md:px-10 lg:px-12 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 border-b border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-5">
                  <div className={`relative bg-gradient-to-br from-white/25 to-white/15 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-500 ${hoveredCard === 'venue' ? 'scale-110 rotate-3 shadow-xl' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl" />
                    <Heart className="relative text-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                      Ceremony & Reception
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/75 font-medium">
                      {siteConfig.ceremony.venue}
                    </p>
                  </div>
                </div>
                
                {/* Quick Action Buttons - Refined */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
                  <a
                    href="https://www.facebook.com/MaiPavilionEventsPlace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-3.5 text-white/85 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                    title="Visit Facebook Page"
                    aria-label="Visit Mai Pavillion Facebook Page"
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <button
                    onClick={() => openInMaps(ceremonyMapsLink)}
                    className="p-3 sm:p-3.5 text-white/85 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                    title="Open in Maps"
                    aria-label="Open venue in Google Maps"
                  >
                    <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(siteConfig.ceremony.location, 'venue')}
                    className="p-3 sm:p-3.5 text-white/85 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                    title="Copy Address"
                    aria-label="Copy venue address"
                  >
                    {copiedItems.has('venue') ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
                    ) : (
                      <Copy className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>
                </div>
              </div>
            </header>

            {/* Card Content - Enhanced Spacing */}
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10">
              
              {/* Location Section */}
              <div className="mb-8 sm:mb-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 rounded-xl shadow-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider mb-2">Location</p>
                    <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-medium break-words text-pretty">
                      {siteConfig.ceremony.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time Grid - Enhanced Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="group/time relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/15 shadow-lg hover:shadow-xl hover:border-white/25 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#818D77]/10 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover/time:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 rounded-xl shadow-md">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider">Ceremony</p>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {siteConfig.ceremony.date}
                  </p>
                  <div className="flex items-center gap-2.5 text-sm sm:text-base md:text-lg text-white/85">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium">{siteConfig.ceremony.time}</span>
                  </div>
                </div>
                
                <div className="group/time relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/15 shadow-lg hover:shadow-xl hover:border-white/25 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#818D77]/10 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover/time:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 rounded-xl shadow-md">
                      <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider">Reception</p>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {siteConfig.reception.date}
                  </p>
                  <div className="flex items-center gap-2.5 text-sm sm:text-base md:text-lg text-white/85">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium">{siteConfig.reception.time}</span>
                  </div>
                </div>
              </div>

              {/* Venue Image - Enhanced */}
              <div className="mb-8 sm:mb-10">
                <button
                  onClick={() => setShowImageModal('ceremony')}
                  className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden group/image border-2 border-white/25 hover:border-white/40 transition-all duration-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#8096AE]"
                  aria-label="View venue image"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
                  <Image
                    src="/Details/church.png"
                    alt={siteConfig.ceremony.location}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-30">
                    <div className="bg-white/95 backdrop-blur-md rounded-full p-5 sm:p-6 shadow-2xl transform group-hover/image:scale-110 transition-transform duration-500 border-2 border-white/50">
                      <Camera className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#8096AE]" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Action Buttons - Enhanced Hierarchy */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/MaiPavilionEventsPlace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#1877F2] to-[#166FE5] hover:from-[#166FE5] hover:to-[#1458c4] text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl border border-white/20"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook Page</span>
                </a>
                <button
                  onClick={() => setShowImageModal('ceremony')}
                  className="min-w-0 w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 bg-white/12 hover:bg-white/18 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base border border-white/25 hover:border-white/35 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  <span>View Venue</span>
                </button>
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="min-w-0 w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#818D77] to-[#7a826f] hover:from-[#7a826f] hover:to-[#6f7668] text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl border border-white/20"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Wedding Theme Section - Compact Design */}
        <section className="relative">
          <div className="bg-white/12 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-xl hover:shadow-2xl hover:border-white/35 transition-all duration-500">
            <div className="px-6 sm:px-8 py-6 sm:py-8 text-center">
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-3 sm:mb-5">
                <div className="bg-gradient-to-br from-white/25 to-white/15 p-2.5 sm:p-3 rounded-xl shadow-md">
                  <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                </div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                  Wedding Theme
                </h3>
              </div>  
              {/* Color Palette - Circular Design */}
              <div className="flex items-center justify-center gap-3.5 sm:gap-5 md:gap-6 flex-wrap">
                {[
                  { color: '#8096AE' },
                  { color: '#818D77' },
                  { color: '#B8B8B8' },
                  { color: '#D0D2D1' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 group/color">
                    <div 
                      className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[3px] border-white/60 shadow-lg hover:shadow-xl hover:scale-110 hover:border-white/80 transition-all duration-500 cursor-pointer overflow-hidden"
                      style={{ backgroundColor: item.color }}
                      title={item.color}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/color:opacity-100 transition-opacity duration-500" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/70 font-mono tracking-wide">{item.color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Information - Enhanced Grid */}
        <section className="relative">
          <header className="text-center mb-10 sm:mb-12 md:mb-14">
            <div className="flex items-center justify-center gap-4 sm:gap-5 mb-5 sm:mb-6">
              <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-white/50 to-white/50" />
              <div className="bg-gradient-to-br from-white/25 to-white/15 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent via-white/50 to-white/50" />
            </div>
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              Important Information
            </h3>
            <p className="text-[13px] sm:text-base md:text-lg text-white/75">
              Everything you need to know
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {/* Attire Cards - Enhanced */}
            <article className="bg-white/12 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-xl hover:shadow-2xl hover:border-white/35 hover:-translate-y-1 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative px-6 sm:px-8 py-7 sm:py-8 md:py-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 sm:p-4 rounded-xl shadow-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    Entourage Attire
                  </h4>
                </div>
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      Ladies
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      Filipiniana
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      Gentlemen
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      Barong & Black Slacks
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="bg-white/12 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-xl hover:shadow-2xl hover:border-white/35 hover:-translate-y-1 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative px-6 sm:px-8 py-7 sm:py-8 md:py-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 sm:p-4 rounded-xl shadow-lg">
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    Guests Attire
                  </h4>
                </div>
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      For Ladies
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      Filipiniana or Long Dress
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mb-2.5">
                      For Gentlemen
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white font-medium">
                      Barong or Polo
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Additional Info Card - Full Width */}
            <article className="sm:col-span-2 bg-white/12 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 shadow-xl hover:shadow-2xl hover:border-white/35 hover:-translate-y-1 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative px-6 sm:px-8 md:px-10 py-7 sm:py-8 md:py-10">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-[#818D77]/40 to-[#818D77]/20 p-3 sm:p-4 rounded-xl shadow-lg">
                    <Navigation className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    Additional Information
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {[
                    { label: 'Parking', value: 'Available at venue' },
                    { label: 'Arrival Time', value: '15-20 minutes before ceremony' },
                    { label: 'Contact', value: '-' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/15 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <p className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mb-2.5">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      {/* Enhanced Modal - Premium Design */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/97 backdrop-blur-lg z-50 flex items-start justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-300 overflow-y-auto overscroll-contain"
          onClick={() => setShowImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="details-modal-title"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8096AE]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#818D77]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div 
            className="relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-white/12 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/25 animate-in zoom-in-95 duration-300 my-6 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-sm p-3.5 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/25"
              title="Close (ESC)"
              aria-label="Close modal"
              ref={closeButtonRef}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Venue Badge */}
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20">
              <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/25">
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
                <span className="text-xs sm:text-sm font-semibold text-white">Ceremony & Reception</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-[42vh] sm:h-[50vh] md:h-[60vh] bg-white/5 overflow-hidden">
              <Image
                src={showImageModal === 'ceremony' ? "/Details/church.png" : "/Details/D-L-Garden.png"}
                alt={siteConfig.ceremony.location}
                fill
                className="object-contain p-4 sm:p-6 md:p-8"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-7 md:p-10 border-t border-white/15 bg-white/5 backdrop-blur-sm">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 id="details-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" />
                    {siteConfig.ceremony.venue}
                  </h3>
                  <div className="flex items-center gap-2.5 text-sm sm:text-base text-white/85 mb-4 sm:mb-5">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="break-words text-pretty">{siteConfig.ceremony.location}</span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-white/12 to-white/6 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-lg">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Heart className="w-5 h-5 text-white" fill="currentColor" />
                      <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Ceremony</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{siteConfig.ceremony.date}</p>
                    <p className="text-sm sm:text-base text-white/85">{siteConfig.ceremony.time}</p>
                  </div>
                  <div className="bg-gradient-to-br from-white/12 to-white/6 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/15 shadow-lg">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Utensils className="w-5 h-5 text-white" />
                      <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Reception</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{siteConfig.reception.date}</p>
                    <p className="text-sm sm:text-base text-white/85">{siteConfig.reception.time}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                  <a
                    href="https://www.facebook.com/MaiPavilionEventsPlace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#1877F2] to-[#166FE5] hover:from-[#166FE5] hover:to-[#1458c4] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(siteConfig.ceremony.location, `modal-${showImageModal}`)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/12 hover:bg-white/18 border border-white/25 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {copiedItems.has(`modal-${showImageModal}`) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => openInMaps(ceremonyMapsLink)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#818D77] to-[#7a826f] hover:from-[#7a826f] hover:to-[#6f7668] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
