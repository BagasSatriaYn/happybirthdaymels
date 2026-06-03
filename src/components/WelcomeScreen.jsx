import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function WelcomeScreen({ onOpen }) {
  const audioRef = useRef(null)

  const handleOpen = () => {
    // Burst confetti hearts
    const heartConfetti = confetti.create(null, { resize: true })
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#ff6b9d', '#fff1f2']

    const fire = (angle, origin) => {
      heartConfetti({
        particleCount: 60,
        angle,
        spread: 70,
        origin,
        colors,
        shapes: ['circle', 'square'],
        scalar: 0.9,
        gravity: 0.8,
        drift: 0.5,
        ticks: 200,
      })
    }

    fire(60, { x: 0, y: 0.7 })
    fire(120, { x: 1, y: 0.7 })
    setTimeout(() => {
      fire(80, { x: 0.2, y: 0.8 })
      fire(100, { x: 0.8, y: 0.8 })
    }, 200)
    setTimeout(() => {
      heartConfetti({
        particleCount: 80,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.7 },
        colors,
        shapes: ['circle'],
        scalar: 1.1,
        gravity: 0.6,
        ticks: 250,
      })
    }, 400)

    onOpen()
  }

  return (
    <div className="welcome-overlay fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['❤️', '🩷', '💕', '💗', '💖', '🌸', '✨', '💝'].map((heart, i) => (
          <span
            key={i}
            className="floating-heart select-none"
            style={{
              left: `${10 + (i * 12)}%`,
              animationDuration: `${6 + (i * 0.7)}s`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${0.8 + (i % 3) * 0.4}rem`,
              opacity: 0.6,
            }}
          >
            {heart}
          </span>
        ))}
      </div>

      <div className="welcome-card rounded-3xl p-8 max-w-sm w-full space-y-6 relative z-10">
        {/* Pulsing heart icon */}
        <div className="pulse-heart text-5xl select-none">❤️</div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-cursive text-5xl text-rose-500 leading-tight">
            Our Safe Space
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>
        </div>

        {/* Greeting text */}
        <div className="space-y-3">
          <p className="text-gray-600 text-sm leading-relaxed">
            Hai <span className="font-semibold text-rose-500">Cimiii Cantik</span> ✨
          </p>
          <p className="text-gray-500 text-xs leading-relaxed px-2">
            Ada sebuah tempat kecil yang sengaja aku buat khusus buat kamu. Di sini tersimpan semua kenangan, kejutan, dan rasa sayang yang nggak pernah habis.
          </p>
          <p className="text-rose-400 text-xs font-medium">
            🎂 <span className="font-semibold">Selamat Ulang Tahun, Sayang!</span> 🎂
          </p>
          <p className="text-gray-400 text-xs">
            Dibuka ya? 💌
          </p>
        </div>

        {/* Open button */}
        <button
          onClick={handleOpen}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          <span>💌</span>
          <span>Klik untuk Membuka Cerita Kita</span>
        </button>

        {/* Footer hint */}
        <p className="text-gray-300 text-[10px]">
          dibuat dengan ❤️ oleh Mas Ia
        </p>
      </div>
    </div>
  )
}
