"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on gallery page
  if (pathname === "/gallery") {
    return null
  }
  
  return <Navbar />
}



