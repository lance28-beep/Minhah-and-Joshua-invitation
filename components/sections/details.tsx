"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin, Facebook, Phone, MessageSquareText, MessageCircle, CameraOff } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
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

  const openWhatsApp = (phoneNumber: string) => {
    // Remove all non-digit characters and handle Philippine phone numbers
    const cleaned = phoneNumber.replace(/\D/g, '')
    // If it starts with 0, remove it and add country code 63 for Philippines
    const formatted = cleaned.startsWith('0') ? `63${cleaned.slice(1)}` : cleaned
    const whatsappLink = `https://wa.me/${formatted}`
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative bg-gradient-to-br from-[#8096AE] via-[#7e94ab] to-[#7a8ca0] py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#818D77]/5 to-[#818D77]/10" />
      </div>

      {/* Section Header - Simplified */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-4">
          Event Details
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Main Content - Simplified Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-10">
        
        {/* Venue Card - Simplified */}
        <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
          <header className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Heart className="text-white w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                    Ceremony & Reception
                  </h3>
                  <p className="text-sm sm:text-base text-white/80">
                    {siteConfig.ceremony.venue}
                  </p>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/MaiPavilionEventsPlace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
                  title="Visit Facebook Page"
                  aria-label="Visit Mai Pavillion Facebook Page"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="p-2.5 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
                  title="Open in Maps"
                  aria-label="Open venue in Google Maps"
                >
                  <Navigation className="w-5 h-5" />
                </button>
                <button
                  onClick={() => copyToClipboard(siteConfig.ceremony.location, 'venue')}
                  className="p-2.5 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
                  title="Copy Address"
                  aria-label="Copy venue address"
                >
                  {copiedItems.has('venue') ? (
                    <Check className="w-5 h-5 text-emerald-300" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            {/* Location */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-white leading-relaxed break-words">
                  {siteConfig.ceremony.location}
                </p>
              </div>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-white/15">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  <p className="text-xs font-semibold text-white/70 uppercase">Ceremony</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white mb-2">
                  {siteConfig.ceremony.date}
                </p>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Clock className="w-4 h-4" />
                  <span>{siteConfig.ceremony.time}</span>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-white/15">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-5 h-5 text-white" />
                  <p className="text-xs font-semibold text-white/70 uppercase">Reception</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white mb-2">
                  {siteConfig.reception.date}
                </p>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Clock className="w-4 h-4" />
                  <span>{siteConfig.reception.time}</span>
                </div>
              </div>
            </div>

            {/* Venue Image */}
            <div className="mb-6">
              <button
                onClick={() => setShowImageModal('ceremony')}
                className="relative w-full h-48 sm:h-64 md:h-72 rounded-xl overflow-hidden border border-white/20 hover:border-white/30 transition-colors"
                aria-label="View venue image"
              >
                <Image
                  src="/Details/church.png"
                  alt={siteConfig.ceremony.location}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.facebook.com/MaiPavilionEventsPlace/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <button
                onClick={() => setShowImageModal('ceremony')}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-colors border border-white/20"
              >
                <Camera className="w-4 h-4" />
                <span>View Venue</span>
              </button>
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#818D77] hover:bg-[#7a826f] text-white rounded-lg font-medium text-sm transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </article>

        {/* Important Information - Simplified */}
        <section>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
            Important Information
          </h3>

          <div className="space-y-6 sm:space-y-8">
            {/* Unplugged Ceremony Reminder Card */}
            <article className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl">
              <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <CameraOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white text-center">
                    Unplugged Ceremony Reminders
                  </h4>
                  <CameraOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                
                <div className="space-y-4 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    Phones down, hearts open! 💕
                  </p>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                    Join us in the moment as we say our vows.
                  </p>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                    Our photographers will take care of the memories. You just enjoy the love around you.
                  </p>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </div>
            </article>

            {/* Entourage Attire Card */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-white" />
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    Entourage Attire
                  </h4>
                </div>
                
                {/* Wedding Colors Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Heart className="text-white w-5 h-5" fill="currentColor" />
                    <h5 className="text-base sm:text-lg font-bold text-white">
                      Wedding Colors
                    </h5>
                  </div>
                  
                  {/* Entourage Colors */}
                  <div className="mb-6">
                    <h6 className="text-sm sm:text-base font-semibold text-white mb-4 text-center">
                      Entourage Attire Colors
                    </h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { name: 'Principal Female Sponsors', color: '#99a98f', description: 'Sage Green' },
                        { name: 'Principal Male Sponsors', color: '#fff0db', description: 'Beige' },
                        { name: 'Matron of Honor', color: '#a0a9b2', description: 'Light Gray, long dress' },
                        { name: 'Best Man', color: '#a0a9b2', description: 'Light Gray suit, white inner, light gray pants' },
                        { name: 'Bridesmaids', color: '#789EBF', description: 'Dusty Blue, Long dress' },
                        { name: 'Groomsmen', color: '#789EBF', description: 'Dusty Blue suit, White inner, dusty blue pants, black shoes' },
                      ].map((item, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-3 sm:p-4 border border-white/15">
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/50 flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                              title={item.color}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">{item.name}</p>
                            </div>
                          </div>
                          <p className="text-xs text-white/80">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guest Colors */}
                  <div className="border-t border-white/15 pt-6">
                    <h6 className="text-sm sm:text-base font-semibold text-white mb-4 text-center">
                      Guest Attire Colors
                    </h6>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                      {[
                        { name: 'Pastel Purple', color: '#C3B1E1' },
                        { name: 'Light Yellow', color: '#fffec8' },
                        { name: 'Pastel Pink', color: '#F8C8DC' },
                        { name: 'Cream', color: '#FFFDD0' },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div 
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/50"
                            style={{ backgroundColor: item.color }}
                            title={`${item.name}: ${item.color}`}
                          />
                          <p className="text-xs text-white text-center max-w-[70px]">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Note Section */}
                <div className="border-t border-white/15 pt-4">
                  <div className="bg-white/10 rounded-lg p-4 border border-white/15">
                    <p className="text-xs font-semibold text-white/70 uppercase mb-1">
                      Note
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium">
                      Formal Wear
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Dress Code Note Card */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Dress Code Note
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Please join us in celebrating our day in style by wearing our wedding colors. We kindly ask that guests refrain from wearing white and navy blue.
                </p>
              </div>
            </article>

            {/* Additional Info Card */}
            <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-4">
                  <Navigation className="w-5 h-5 text-white" />
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Additional Information
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Parking', value: 'Available at venue' },
                    { label: 'Arrival Time', value: '15-20 minutes before ceremony' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/15">
                      <p className="text-xs font-semibold text-white/70 uppercase mb-2">
                        {item.label}
                      </p>
                      <p className="text-sm text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Contact Information - Simplified */}
        <section>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
            <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  Contact Us
                </h3>
                <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
                  We'd love to hear from you. Reach out anytime for inquiries or assistance.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Minhah's Card */}
                <div className="bg-white/10 rounded-xl p-5 sm:p-6 border border-white/15">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Minhah
                      </h4>
                      <a 
                        href="tel:09916592500" 
                        className="inline-flex items-center gap-2 p-3 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5 text-white" />
                        <span className="font-mono text-sm sm:text-base text-white font-medium">09916592500</span>
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard('09916592500', 'copy-minhah')}
                      className="p-2.5 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="Copy Minhah's number"
                      title="Copy number"
                    >
                      {copiedItems.has('copy-minhah') ? (
                        <Check className="w-5 h-5 text-emerald-300" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      href="tel:09916592500"
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="Call Minhah"
                    >
                      <Phone className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">Call</span>
                    </a>
                    <a
                      href="sms:09916592500"
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="SMS Minhah"
                    >
                      <MessageSquareText className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">SMS</span>
                    </a>
                    <button
                      onClick={() => openWhatsApp('09916592500')}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="WhatsApp Minhah"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">WA</span>
                    </button>
                  </div>
                </div>

                {/* Joshua's Card */}
                <div className="bg-white/10 rounded-xl p-5 sm:p-6 border border-white/15">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Joshua
                      </h4>
                      <a 
                        href="tel:09124896551" 
                        className="inline-flex items-center gap-2 p-3 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5 text-white" />
                        <span className="font-mono text-sm sm:text-base text-white font-medium">09124896551</span>
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard('09124896551', 'copy-joshua')}
                      className="p-2.5 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="Copy Joshua's number"
                      title="Copy number"
                    >
                      {copiedItems.has('copy-joshua') ? (
                        <Check className="w-5 h-5 text-emerald-300" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <a
                      href="tel:09124896551"
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="Call Joshua"
                    >
                      <Phone className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">Call</span>
                    </a>
                    <a
                      href="sms:09124896551"
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="SMS Joshua"
                    >
                      <MessageSquareText className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">SMS</span>
                    </a>
                    <button
                      onClick={() => openWhatsApp('09124896551')}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/15 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                      aria-label="WhatsApp Joshua"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span className="text-xs font-semibold text-white">WA</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Simplified Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="details-modal-title"
        >
          <div 
            className="relative w-full max-w-2xl md:max-w-4xl bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              title="Close (ESC)"
              aria-label="Close modal"
              ref={closeButtonRef}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-white/5">
              <Image
                src={showImageModal === 'ceremony' ? "/Details/church.png" : "/Details/D-L-Garden.png"}
                alt={siteConfig.ceremony.location}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 border-t border-white/15">
              <div className="space-y-4">
                <div>
                  <h3 id="details-modal-title" className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    {siteConfig.ceremony.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/90 mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{siteConfig.ceremony.location}</span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-4 border border-white/15">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-white" fill="currentColor" />
                      <p className="text-xs font-semibold text-white/70 uppercase">Ceremony</p>
                    </div>
                    <p className="text-base font-bold text-white mb-1">{siteConfig.ceremony.date}</p>
                    <p className="text-sm text-white/85">{siteConfig.ceremony.time}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 border border-white/15">
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils className="w-4 h-4 text-white" />
                      <p className="text-xs font-semibold text-white/70 uppercase">Reception</p>
                    </div>
                    <p className="text-base font-bold text-white mb-1">{siteConfig.reception.date}</p>
                    <p className="text-sm text-white/85">{siteConfig.reception.time}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.facebook.com/MaiPavilionEventsPlace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(siteConfig.ceremony.location, `modal-${showImageModal}`)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium text-sm transition-colors"
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
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#818D77] hover:bg-[#7a826f] text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Directions</span>
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
