import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', // Prevent invisible text during font load
  preload: true,
})
const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-serif",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Joshua & Minhah - Wedding Invitation",
  description:
    "You're invited to the wedding of Joshua & Minhah! Join us on June 12, 2026 in Bacoor, Cavite, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Joshua & Minhah wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Bacoor, Cavite, #aMINAdongIkawNaAngJOSHtoKo, #JOSHtheOneForMINA",
  authors: [
    { name: "Joshua" },
    { name: "Minhah" },
  ],
  creator: "Joshua & Minhah",
  publisher: "Joshua & Minhah",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Minhah-and-Joshua-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Minhah-and-Joshua-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Joshua & Minhah Wedding | June 12, 2026",
    description:
      "Celebrate the union of Joshua & Minhah on June 12, 2026 in Bacoor, Cavite, Philippines. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Minhah-and-Joshua-invitation.vercel.app/",
    siteName: "Joshua & Minhah Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Minhah-and-Joshua-invitation.vercel.app/couple.png",
        width: 1200,
        height: 630,
        alt: "Joshua & Minhah Wedding Invitation - June 12, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua & Minhah Wedding Invitation",
    description:
      "You're invited to the wedding of Joshua & Minhah! June 12, 2026. RSVP, view our gallery, and leave a message! #aMINAdongIkawNaAngJOSHtoKo #JOSHtheOneForMINA",
    images: ["https://Minhah-and-Joshua-invitation.vercel.app/couple.png"],
    creator: "@rachelandarnulfo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Joshua & Minhah Wedding",
      startDate: "2026-06-12T16:00:00+08:00",
      endDate: "2026-06-12T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Mai Pavillion",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bacoor, Cavite",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Minhah-and-Joshua-invitation.vercel.app/couple.png"],
      description:
        "You're invited to the wedding of Joshua & Minhah! Join us on June 12, 2026 in Bacoor, Cavite, Philippines. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Joshua & Minhah",
      },
      offers: {
        "@type": "Offer",
        url: "https://Minhah-and-Joshua-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#aMINAdongIkawNaAngJOSHtoKo",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#866347" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/* Preload critical resources */}
        <link rel="preload" href="/decoration/hero-flower-corner-top-left.png" as="image" />
        {/* Fonts are automatically preloaded by Next.js font optimization */}
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}