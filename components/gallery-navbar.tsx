"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { siteConfig } from "@/content/site"

export function GalleryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-gradient-to-b from-[#8096AE]/95 via-[#8096AE]/85 to-[#8096AE]/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border-b border-[#D0D2D1]/30' 
        : 'bg-gradient-to-b from-[#8096AE]/60 via-[#8096AE]/40 to-transparent backdrop-blur-lg border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link 
            href="/" 
            className="flex items-center gap-3 sm:gap-4 group relative z-10"
          >
            <div className="bg-white/20 group-hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 group-hover:scale-110">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-[#D0D2D1] transition-colors duration-300">
                Back to Main Page
              </span>
              <span className="text-xs text-white/80 group-hover:text-white/90 transition-colors duration-300">
                {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
            <span className="text-base sm:text-lg md:text-xl font-serif font-bold text-white">
              Our Gallery
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
