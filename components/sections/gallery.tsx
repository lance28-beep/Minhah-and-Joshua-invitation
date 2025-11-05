"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import Link from "next/link"
// Removed circular gallery in favor of a responsive masonry layout

const galleryItems = [
  { image: "/Couple_img/1-min.png", text: " " },   
  { image: "/Couple_img/2-min.png", text: " " },
  { image: "/Couple_img/3-min.png", text: " " },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative bg-[#8096AE] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Floating geometric shapes with color palette - hidden on small screens */}
        <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-[#818D77]/15 rounded-full blur-xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-16 h-16 bg-[#B8B8B8]/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="hidden sm:block absolute bottom-20 left-20 w-24 h-24 bg-[#D0D2D1]/15 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="hidden sm:block absolute bottom-10 right-10 w-12 h-12 bg-[#8096AE]/20 rounded-full blur-lg animate-pulse delay-500" />
        
        {/* Smaller mobile decorative elements */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#818D77]/12 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#B8B8B8]/12 rounded-full blur-md animate-pulse delay-1000" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-[#D0D2D1]/30" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-[#B8B8B8]/25" />
        
        {/* Corner decorative elements with color palette - reduced on mobile */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-[#D0D2D1]/15 rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-[#D0D2D1]/15 rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-[#D0D2D1]/15 rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-[#D0D2D1]/15 rounded-tl-3xl" />
        {/* Decorative corner images */}
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
      </div>

      {/* Custom larger title */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-[#D0D2D1]/60" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#8096AE] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#B8B8B8] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#8096AE] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-[#D0D2D1]/60" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 text-balance drop-shadow-lg relative px-2">
          <span className="relative z-10 text-white">Our Moments</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#B8B8B8]/30 blur-2xl -z-10">Our Moments</span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-white font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Every moment, a treasured memory made eternal
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="w-8 sm:w-12 h-px bg-[#D0D2D1]/40" />
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#B8B8B8] rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-[#D0D2D1]/40" />
        </div>
      </div>

      {/* Gallery content */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="flex justify-center px-2 sm:px-4">
          <div className="max-w-6xl w-full">
            {/* Enhanced gallery container */}
            <div className="relative overflow-hidden rounded-3xl">
              {/* Multiple layered glow effects */}
              <div className="absolute -inset-4 bg-[#8096AE]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-[#D0D2D1]/30 rounded-3xl blur-md opacity-40 animate-pulse" />

              {/* Enhanced decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#8096AE] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#D0D2D1] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#818D77] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#B8B8B8] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main gallery card with enhanced multi-layer styling */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-7 lg:p-9 border-2 border-[#D0D2D1] shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                
                {/* Inner decorative border with gradient */}
                <div className="absolute inset-1 sm:inset-2 border border-[#B8B8B8]/50 rounded-xl sm:rounded-2xl" />
                
                {/* Additional inner glow */}
                <div className="absolute inset-2 sm:inset-3 bg-[#8096AE]/5 rounded-xl sm:rounded-2xl" />
                
                {/* Gallery content */}
                <div className="relative z-10 w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
                      <div className="w-16 h-16 border-4 border-[#D0D2D1]/40 border-t-[#8096AE] rounded-full animate-spin" />
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {galleryItems.map((item, index) => (
                      <button
                        key={item.image + index}
                        type="button"
                        className="group relative w-full overflow-hidden rounded-xl border border-[#D0D2D1]/60 bg-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)] transition-all"
                        onClick={() => {
                          setSelectedImage(item)
                          setCurrentIndex(index)
                        }}
                        aria-label={`Open image ${index + 1}`}
                      >
                        <div className="aspect-[3/4] md:aspect-square">
                          <img
                            src={item.image}
                            alt={item.text}
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="w-full h-full object-cover align-top transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                        {/* Subtle overlay caption */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 sm:p-3">
                          <div className="mx-2 rounded-md bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-[10px] sm:text-xs md:text-sm text-white px-2 py-1 font-sans">{item.text}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* View More Button */}
                  <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
                    <Link
                      href="/gallery"
                      className="group relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-[#8096AE] via-[#818D77] to-[#8096AE] text-white font-sans font-bold text-base sm:text-lg md:text-xl rounded-[2rem] transition-all duration-500 text-center overflow-hidden shadow-xl hover:shadow-2xl border-2 border-[#D0D2D1] hover:border-white hover:scale-[1.05] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#818D77] via-[#8096AE] to-[#818D77] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative z-10 tracking-wide uppercase inline-flex items-center gap-3">
                        View More Photos
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
                
                {/* Enhanced decorative sparkle effects */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#8096AE] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#818D77] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#D0D2D1] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
        {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top gradient for button contrast and safe area */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 sm:h-20 bg-black/60" />
            {/* Image counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 z-20 bg-[#8096AE]/20 backdrop-blur-md rounded-full px-4 py-2 border border-[#D0D2D1]/50">
              <span className="text-sm sm:text-base font-semibold text-white">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            </div>

            {/* Navigation buttons */}

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} className="sm:w-9 sm:h-9 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Next image"
            >
              <ChevronRight size={28} className="sm:w-9 sm:h-9 text-white" />
            </button>

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center mt-12 sm:mt-16 mb-20 overflow-hidden">
              <div
                className="relative inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text}
                  style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`, transition: pinchStartDist ? 'none' : 'transform 200ms ease-out' }}
                  className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl will-change-transform"
                />
                {/* Close button anchored to image corner */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                  }}
                  className="absolute top-2 right-2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-2.5 transition-all duration-200 border border-white/30"
                  aria-label="Close lightbox"
                >
                  <X size={20} className="text-white" />
                </button>
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1 text-xs border border-white/30"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Image description */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 bg-[#8096AE]/20 backdrop-blur-md rounded-full px-4 py-2 border border-[#D0D2D1]/50">
              <p className="text-sm sm:text-base font-medium text-white text-center">
                {selectedImage.text}
              </p>
            </div>

            {/* Mobile swipe hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden text-white/50 text-xs">
              Swipe to navigate
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
