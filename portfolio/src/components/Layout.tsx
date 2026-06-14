import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <a
        href="#main"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:w-auto focus:h-auto focus:p-3 focus:m-0 focus:overflow-visible focus:whitespace-normal glass text-sm text-white/80"
        style={{ clip: 'auto' }}
      >
        Skip to content
      </a>
      <main id="main" className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
