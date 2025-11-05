"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

// All couple images
const allGalleryImages = [
  "/gallery/images (1).png",
  "/gallery/images (2).png",
  "/gallery/images (3).png",
  "/gallery/images (4).png",
  "/gallery/images (5).png",
  "/gallery/images (6).png",
  "/gallery/images (7).png",
  "/gallery/images (8).png",
  "/gallery/images (9).png",
  "/gallery/images (10).png",
  "/gallery/images (11).png",
  "/gallery/images (12).png",
  "/gallery/images (13).png",
  "/gallery/images (14).png",
  "/gallery/images (15).png",
  "/gallery/images (16).png",
  "/gallery/images (17).png",
  "/gallery/images (18).png",
  "/gallery/images (19).png",
  "/gallery/images (20).png",
  "/gallery/images (21).png",
  "/gallery/images (22).png",
  "/gallery/images (23).png",
  "/gallery/images (24).png",
  "/gallery/images (25).png",
  "/gallery/images (26).png",
  "/gallery/images (27).png",
  "/gallery/images (28).png",
  "/gallery/images (29).png",
  "/gallery/images (30).png",
  "/gallery/images (31).png",
  "/gallery/images (32).png",
  "/gallery/images (33).png",
  "/gallery/images (34).png",
  "/gallery/images (35).png",
  "/gallery/images (36).png",
  "/gallery/images (37).png",
  "/gallery/images (38).png",
  "/gallery/images (39).png",
  "/gallery/images (40).png",
  "/gallery/images (41).png",
  "/gallery/images (42).png",
  "/gallery/images (43).png",
  "/gallery/images (44).png",
  "/gallery/images (45).png",
  "/gallery/images (46).png",
  "/gallery/images (47).png",
  "/gallery/images (48).png",
  "/gallery/images (49).png",
  "/gallery/images (50).png",
  "/gallery/images (51).png",
  "/gallery/images (52).png",
  "/gallery/images (53).png",
  "/gallery/images (54).png",
  "/gallery/images (55).png",
  "/gallery/images (56).png",
  "/gallery/images (57).png",
  "/gallery/images (58).png",
  "/gallery/images (59).png",
  "/gallery/images (60).png",
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % allGalleryImages.length
      } else {
        newIndex = (prevIndex - 1 + allGalleryImages.length) % allGalleryImages.length
      }
      setSelectedImage(allGalleryImages[newIndex])
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
  }, [selectedImage, navigateImage])

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

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  return (
    <main className="relative min-h-screen">
      {/* Silk Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Silk speed={5} scale={1.1} color="#8D8E7C" noiseIntensity={0.8} rotation={0.3} />
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8096AE]/20 via-[#818D77]/15 to-[#D0D2D1]/8"></div>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg group"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <span className="text-sm sm:text-base font-semibold text-white hidden sm:inline">
          Back to Main Page
        </span>
        <span className="text-sm font-semibold text-white sm:hidden">
          Back
        </span>
      </Link>

      {/* Gallery Content */}
      <div className="relative z-10 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto">
            Every moment, a treasured memory made eternal
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
            {allGalleryImages.map((image, index) => (
              <div
                key={image}
                className="mb-4 sm:mb-6 break-inside-avoid group cursor-pointer"
                onClick={() => handleImageClick(image, index)}
              >
                <div className="relative overflow-hidden rounded-xl border border-[#D0D2D1]/60 bg-white/10 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)] transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative w-full">
                    <Image
                      src={image}
                      alt={`Couple photo ${index + 1}`}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
                          <ChevronRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glass Style Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Glass Modal Container */}
          <div
            className="relative w-full max-w-6xl h-full sm:h-auto flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>

            {/* Top Bar with Counter and Close */}
            <div className="relative z-20 w-full flex items-center justify-between p-4 sm:p-6 mb-4">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm sm:text-base font-semibold text-white">
                  {currentIndex + 1} / {allGalleryImages.length}
                </span>
              </div>
              
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Image Container */}
            <div 
              className="relative z-20 w-full flex items-center justify-center px-4 pb-4"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  setTouchStartX(e.touches[0].clientX)
                  setTouchDeltaX(0)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 1 && touchStartX !== null) {
                  setTouchDeltaX(e.touches[0].clientX - touchStartX)
                }
              }}
              onTouchEnd={() => {
                if (Math.abs(touchDeltaX) > 50) {
                  if (touchDeltaX > 0) {
                    navigateImage('prev')
                  } else {
                    navigateImage('next')
                  }
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
              <div className="relative max-w-full max-h-[70vh] sm:max-h-[80vh]">
                <Image
                  src={selectedImage}
                  alt={`Gallery image ${currentIndex + 1}`}
                  width={1200}
                  height={1600}
                  className="max-w-full max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('prev')
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('next')
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="relative z-20 w-full px-4 pb-4">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 text-center">
                <p className="text-sm sm:text-base font-medium text-white">
                  Photo {currentIndex + 1} of {allGalleryImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
