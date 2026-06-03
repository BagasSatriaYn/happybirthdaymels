import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'

// ============================================================
// QUIZ QUESTIONS
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    question: 'Di mana tempat pertama kali kita ketemu waktu udah dewasa secara langsung? 👀',
    // OPSI SUDAH DIUBAH: Menghapus stasiun, menambahkan 'dirumah mas ia' di indeks 1
    options: ['Alun-alun Malang', 'dirumah Mas Ia', 'Mall MOG (Mall Olympic Garden) Malang', 'Jatim Park 1, Batu'],
    answer: 1, // Index jawaban benar sekarang mengarah ke 'dirumah mas ia'
    hint: 'Inget nggak, rumahnya mas ia yang penuh cerita awal mula kita? 🏡💕',
  },
  {
    id: 2,
    question: 'Di mana Mas ia nembak cimi dan kita resmi jadian? ☕',
    options: ['Taman Kota Malang', 'Kafe di Jalan Ijen', 'Jumpa Kopi, Jl. Manunggal Malang', 'Rumah Bagas'],
    answer: 2,
    hint: 'Di sebuah kafe kopi yang cozy dan hangat... 💕',
  },
  {
    id: 3,
    question: 'Tanggal berapa kita resmi jadian? 📅',
    options: ['14 Februari 2024', '8 Oktober 2024', '8 Desember 2024', '1 Januari 2025'],
    answer: 2,
    hint: 'Tanggal yang sama dengan ulang tahun Bagas! 🎂',
  },
  {
    id: 4,
    question: 'Di mana date kita yang paling berkesan dan seru? 🎢',
    options: ['Pantai Balekambang', 'Bromo, Probolinggo', 'Jatim Park 1, Batu', 'Selecta, Batu'],
    answer: 2,
    hint: 'Tempat wisata seru di Kota Batu dengan berbagai wahana! 🎡',
  },
]

// ============================================================
// LOVE LETTER CONTENT
// ============================================================
const LOVE_LETTER = `Hai Cimiiii, cantik dan sayangku yang paling berharga... ✨

Kalau kamu baca surat ini, artinya kamu udah berhasil melewati semua pertanyaan tentang kita. Dan itu udah nunjukin betapa spesialnya kamu — kamu ingat semua hal kecil yang bikin kita jadi "kita".

Aku mau kamu tau, sejak hari pertama kita ketemu, ada sesuatu yang berubah di hidupku. Kayak ada bagian dari diriku yang akhirnya nemu tempat pulang. Kamu itu... hangat. Kamu itu rumah.

Tanggal 8 Desember 2024, di Jumpa Kopi — hari itu nggak cuma jadi hari ulang tahunku yang paling berkesan, tapi juga hari di mana aku resmi minta kamu jadi orang yang mau berjalan di sisi aku. Dan kamu... iya. Itu hadiah ulang tahun terbaik yang pernah aku terima seumur hidup.

Semua momen sama kamu — ketawa bareng, macet-macetan, baper-baperan, debat hal kecil, sampai diem-dieman sebentar — semuanya jadi kenangan yang aku syukuri. Karena kamu yang bikin semuanya berarti.

Kamu bukan sekedar pacar, kamu adalah partner terbaik yang pernah Tuhan kirim ke hidupku.

Makasih udah sabar sama aku yang masih belajar ini. Makasih udah mau percaya sama aku. Makasih udah milih aku setiap hari.

Aku janji akan terus berusaha jadi yang terbaik buat kamu. Jadi orang yang layak kamu banggin. Jadi tangan yang selalu ada buat kamu pegang.

Selamat Ulang Tahun, Annisah Putri Gemelli.
Semoga semua impianmu terwujud, semua doamu dikabulkan, dan semua harimu dipenuhi kebahagiaan — termasuk aku yang selalu ada di dalamnya.

I Love You, Cim.`

// ============================================================
// QUIZ COMPONENT
// ============================================================
export default function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [shake, setShake] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [letterRevealed, setLetterRevealed] = useState(false)
  const [wrongFeedback, setWrongFeedback] = useState(false)
  const [correctFeedback, setCorrectFeedback] = useState(false)
  const quizCardRef = useRef(null)

  const question = QUESTIONS[currentQ]
  const isAllDone = currentQ >= QUESTIONS.length

  const fireConfetti = () => {
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#ff6b9d']
    confetti({
      particleCount: 100,
      angle: 90,
      spread: 90,
      origin: { x: 0.5, y: 0.6 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1,
      gravity: 0.8,
      ticks: 200,
    })
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
        colors,
      })
    }, 150)
  }

  const handleAnswer = (optionIndex) => {
    if (correctFeedback) return

    if (optionIndex === question.answer) {
      // Correct!
      setCorrectFeedback(true)
      fireConfetti()
      setAnswers(prev => ({ ...prev, [currentQ]: optionIndex }))

      setTimeout(() => {
        setCorrectFeedback(false)
        if (currentQ + 1 >= QUESTIONS.length) {
          setCurrentQ(QUESTIONS.length)
          setShowLetter(true)
        } else {
          setCurrentQ(prev => prev + 1)
        }
      }, 1200)
    } else {
      // Wrong!
      setWrongFeedback(true)
      setShake(true)
      setAnswers(prev => ({ ...prev, [currentQ]: optionIndex })) // Mencatat pilihan salah agar efek warna merah jalan
      setTimeout(() => {
        setShake(false)
        setWrongFeedback(false)
      }, 600)
    }
  }

  const openLetter = () => {
    setLetterRevealed(true)
    setTimeout(() => {
      confetti({
        particleCount: 200,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#fda4af', '#fbbf24', '#a78bfa'],
        scalar: 1.2,
        gravity: 0.7,
        ticks: 300,
      })
    }, 300)
  }

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-cursive text-4xl text-rose-500">Love Quiz</h2>
        <p className="text-gray-400 text-xs">Seberapa tahu kamu tentang kita? 💕</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
      </div>

      {!isAllDone ? (
        <>
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Pertanyaan {currentQ + 1} dari {QUESTIONS.length}</span>
              <span>{Math.round(((currentQ) / QUESTIONS.length) * 100)}% Selesai</span>
            </div>
            <div className="bg-rose-50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-500"
                style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            ref={quizCardRef}
            className={`timeline-card rounded-2xl p-5 space-y-4 ${shake ? 'shake' : ''} ${correctFeedback ? 'ring-2 ring-green-300 bg-green-50/50' : wrongFeedback ? 'ring-2 ring-rose-300' : ''
              }`}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                Pertanyaan {currentQ + 1}
              </span>
              <p className="font-semibold text-gray-800 text-sm leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  id={`quiz-option-${currentQ}-${idx}`}
                  onClick={() => handleAnswer(idx)}
                  className={`quiz-option ${correctFeedback && idx === question.answer ? 'correct' : ''
                    } ${wrongFeedback && answers[currentQ] === idx ? 'wrong' : ''}`}
                >
                  <span className="font-semibold text-gray-400 mr-2">
                    {['A', 'B', 'C', 'D'][idx]}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {/* Hint */}
            {wrongFeedback && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                <p className="text-xs text-rose-500">
                  💡 <span className="font-medium">Petunjuk:</span> {question.hint}
                </p>
              </div>
            )}

            {/* Success Feedback */}
            {correctFeedback && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-green-600">🎉 Benar! Kamu ingat ya!</p>
              </div>
            )}
          </div>
        </>
      ) : showLetter ? (
        /* Love Letter Reveal */
        <div className="space-y-5">
          <div className="text-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-5 text-white space-y-2">
            <div className="text-3xl">🎉💌🎊</div>
            <p className="font-bold text-lg">Kamu Luar Biasa!</p>
            <p className="text-pink-100 text-xs leading-relaxed">
              Semua pertanyaan terjawab dengan benar! Kamu beneran ingat semua hal tentang kita. ❤️
            </p>
          </div>

          {!letterRevealed ? (
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-32 h-24 cursor-pointer" onClick={openLetter}>
                <div className="w-full h-full bg-gradient-to-b from-rose-100 to-rose-200 rounded-xl border-2 border-rose-300 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl animate-bounce">💌</div>
                </div>
                <div className="absolute inset-x-0 -top-1 h-12 bg-gradient-to-b from-rose-300 to-transparent opacity-50 rounded-t-xl"
                  style={{ clipPath: 'polygon(0 0, 50% 80%, 100% 0)' }} />
              </div>
              <p className="text-gray-500 text-sm font-medium">Klik amplop untuk membuka surat rahasia 💌</p>
              <button onClick={openLetter} className="btn-primary mx-auto flex items-center gap-2 text-sm">
                <span>💌</span>
                <span>Buka Surat Cinta</span>
              </button>
            </div>
          ) : (
            <div className="envelope-reveal">
              <div className="text-center mb-4">
                <span className="font-cursive text-3xl text-rose-500">Surat Cinta Spesial 💌</span>
              </div>
              <div className="love-letter">
                <p className="whitespace-pre-line text-[13px] leading-loose">{LOVE_LETTER}</p>
                <div className="mt-6 pt-4 border-t border-amber-200 text-center space-y-1">
                  <p className="font-cursive text-2xl text-rose-500 leading-tight">And Many More Chapters to Come...</p>
                  <p className="text-rose-600 font-semibold text-sm">I Love You, Today, Tomorrow, and Always.</p>
                  <p className="text-gray-400 text-xs mt-2">— Mas Ia, dengan sepenuh hati 💕</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentQ(0)
                setAnswers({})
                setShowLetter(false)
                setLetterRevealed(false)
              }}
              className="btn-secondary text-sm"
            >
              🔄 Main Lagi
            </button>
          </div>
        </div>
      ) : null}

      {/* Stats Dots Progress */}
      {!isAllDone && (
        <div className="flex items-center justify-center gap-4 pb-2">
          {QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx < currentQ ? 'bg-rose-400 scale-110' : idx === currentQ ? 'bg-rose-300 scale-125' : 'bg-gray-200'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}