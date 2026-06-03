import { useRef, useState, useEffect } from 'react'

// IMPORT LANGSUNG DARI ASSETS LOKAL
import laguSalPriadi from '../assets/sal-priadi.mp3'

export default function FloatingMusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4
    }

    // Fungsi pemicu saat tombol "Open Story" di Welcome Screen diklik
    const handleOpenStory = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setInitialized(true)
          })
          .catch((err) => console.log("Autoplay diblokir browser, menunggu interaksi user:", err))
      }
    }

    window.addEventListener('open-story', handleOpenStory)
    return () => {
      window.removeEventListener('open-story', handleOpenStory)
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => { })
    }
  }

  return (
    <>
      {/* DI SINI PERBAIKANNYA: src diganti menggunakan variabel hasil import lokal */}
      <audio ref={audioRef} loop src={laguSalPriadi} preload="auto" />

      {/* Tombol Piringan Hitam Mengapung */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-24 right-4 z-40 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-rose-100 text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer ${isPlaying ? 'animate-spin' : ''}`}
        style={{ animationDuration: '4s' }}
        title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
        aria-label={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
      >
        <div className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center text-[10px]">
          {isPlaying ? '🎵' : '▶️'}
        </div>
      </button>

      {/* Notifikasi Tooltip Kecil */}
      <div
        className={`fixed bottom-[104px] right-20 z-40 bg-white/90 backdrop-blur-md text-rose-500 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-rose-100 transition-all duration-300 pointer-events-none ${initialized ? 'opacity-0' : 'opacity-100'}`}
        style={{ whiteSpace: 'nowrap' }}
      >
        {isPlaying ? '🎵 Sal Priadi - Ayo Kita Pergi Makan' : '🎵 Klik untuk putar musik'}
      </div>
    </>
  )
}