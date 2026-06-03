import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import FloatingMusicPlayer from './components/FloatingMusicPlayer'
import BottomNavBar from './components/BottomNavBar'
import AboutUs from './components/AboutUs'
import MemoryLane from './components/MemoryLane'
import LoveCoupons from './components/LoveCoupons'
import LoveQuiz from './components/LoveQuiz'
import LoveWishlist from './components/LoveWishlist'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('memory')
  const [overlayFading, setOverlayFading] = useState(false)

  const handleOpen = () => {
    setOverlayFading(true)
    setTimeout(() => setIsOpen(true), 700)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Scroll to top on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'about':    return <AboutUs />
      case 'memory':   return <MemoryLane />
      case 'wishlist': return <LoveWishlist />
      case 'coupons':  return <LoveCoupons />
      case 'quiz':     return <LoveQuiz />
      default:         return <MemoryLane />
    }
  }

  return (
    <>
      {/* Welcome Screen Overlay */}
      {!isOpen && (
        <div
          className="transition-opacity duration-700"
          style={{ opacity: overlayFading ? 0 : 1, pointerEvents: overlayFading ? 'none' : 'auto' }}
        >
          <WelcomeScreen onOpen={handleOpen} />
        </div>
      )}

      {/* Main Application */}
      {isOpen && (
        <div className="min-h-screen">
          {/* Floating Music Player */}
          <FloatingMusicPlayer />

          {/* Page Content */}
          <main className="max-w-md mx-auto px-4 pt-8 pb-28">
            {/* App Header */}
            <header className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-rose-100 shadow-sm">
                <span className="text-rose-400 text-sm pulse-heart">❤️</span>
                <span className="font-cursive text-xl text-rose-500">Our Safe Space</span>
                <span className="text-rose-400 text-sm pulse-heart">❤️</span>
              </div>
            </header>

            {/* Tab Content */}
            <div key={activeTab}>
              {renderPage()}
            </div>
          </main>

          {/* Bottom Navigation */}
          <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}
    </>
  )
}
