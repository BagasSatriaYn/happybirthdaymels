import { useState } from 'react'

// ============================================================
// KUPON DATA
// ============================================================
const COUPONS = [
  {
    id: 'coupon-food',
    emoji: '🍜',
    category: 'FOOD',
    title: 'Voucher Makan Bebas Pilih Tempat',
    description: 'Kamu boleh pilih restoran mana aja yang kamu mau! Semua ditanggung Bagas, tanpa syarat. 🍽️',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    accent: 'text-orange-500',
    badge: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'coupon-icecream',
    emoji: '🍦',
    category: 'SNACK',
    title: 'Kupon Es Krim Gratis',
    description: 'Es krim favoritmu, bebas pilih rasa dan topping! Kapanpun kamu mau, Bagas siap temani. 🎉',
    color: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    accent: 'text-pink-500',
    badge: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'coupon-deeptalk',
    emoji: '🌙',
    category: 'HEAL & TALK',
    title: 'Kupon Deep Talk Malam Ini',
    description: 'Mau curhat, cerita, atau cuma butuh dengerin suara Bagas? Aku selalu ada buat kamu, malam ini dan selamanya. 💬',
    color: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
    accent: 'text-purple-500',
    badge: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'coupon-date',
    emoji: '🌸',
    category: 'DATE NIGHT',
    title: 'Kupon Date Bebas Pilih Lokasi',
    description: 'Satu date spesial ke mana pun kamu mau! Museum, café, taman, pantai — semua oke! 🗺️',
    color: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    accent: 'text-rose-500',
    badge: 'bg-rose-100 text-rose-600',
  },
  {
    id: 'coupon-hug',
    emoji: '🤗',
    category: 'COMFORT',
    title: 'Kupon Pelukan Ekstra 10 Menit',
    description: 'Kalau lagi butuh kehangatan, klaim ini dan Bagas kasih pelukan ekstra lama. Garansi bikin nyaman! 💕',
    color: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    accent: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'coupon-skip',
    emoji: '✌️',
    category: 'FREE PASS',
    title: 'Kupon Menang Debat Sekali',
    description: 'Klaim ini dan kamu otomatis menang dari apapun yang lagi kita debatin. Berlaku sekali pakai ya! 😂',
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    accent: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
]

// ============================================================
// SUCCESS MODAL
// ============================================================
function SuccessModal({ coupon, onClose }) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card rounded-3xl p-8 max-w-sm w-full text-center space-y-5">
        <div className="text-6xl animate-bounce">{coupon.emoji}</div>
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 text-lg">Kupon Berhasil Diklaim! 🥳</h3>
          <p className="text-rose-500 font-semibold text-sm">"{coupon.title}"</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <p className="text-gray-500 text-xs leading-relaxed">
            Kupon berhasil diaktifkan! Jangan lupa <strong className="text-rose-500">screenshot halaman ini</strong> dan kirim ke Bagas buat validasi ya. Gak ada penolakan! 😉
          </p>
        </div>
        <div className="text-2xl">💌✨🎉</div>
        <button onClick={onClose} className="btn-primary w-full text-sm">
          Siap, Makasih Mas Ia! ❤️
        </button>
      </div>
    </div>
  )
}

// ============================================================
// COUPON CARD COMPONENT
// ============================================================
function CouponCard({ coupon, onClaim, claimed }) {
  return (
    <div className={`coupon-card ${claimed ? 'coupon-claimed' : ''}`}>
      {/* Category badge */}
      <div className="pl-5 pt-4 pr-4 pb-1">
        <span className={`text-[9px] font-bold tracking-widest uppercase ${coupon.badge} px-2 py-0.5 rounded-full`}>
          {coupon.category}
        </span>
      </div>

      {/* Content */}
      <div className={`pl-5 pr-4 pb-4 space-y-3 bg-gradient-to-br ${coupon.color}`}>
        <div className="flex items-start gap-3">
          <span className="text-3xl mt-0.5">{coupon.emoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-sm leading-snug">{coupon.title}</h3>
            <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">{coupon.description}</p>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Claim button */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold ${coupon.accent}`}>
            {claimed ? '✅ Sudah Diklaim' : '🎁 Belum Diklaim'}
          </span>
          <button
            id={coupon.id}
            onClick={() => !claimed && onClaim(coupon)}
            disabled={claimed}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 ${claimed
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : `btn-primary text-xs py-2 px-4`
              }`}
          >
            {claimed ? 'Sudah ✓' : 'Klaim! 🎉'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN LOVE COUPONS COMPONENT
// ============================================================
export default function LoveCoupons() {
  const [claimed, setClaimed] = useState({})
  const [activeCoupon, setActiveCoupon] = useState(null)

  const handleClaim = (coupon) => {
    setActiveCoupon(coupon)
    setClaimed(prev => ({ ...prev, [coupon.id]: true }))
  }

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-cursive text-4xl text-rose-500">Kupon Manja Digital</h2>
        <p className="text-gray-400 text-xs">Klaim kapanpun kamu mau, sayang 🎟️</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
        <p className="text-gray-400 text-[11px]">
          {Object.keys(claimed).length} dari {COUPONS.length} kupon sudah diklaim
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-rose-50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-500"
          style={{ width: `${(Object.keys(claimed).length / COUPONS.length) * 100}%` }}
        />
      </div>

      {/* Coupon Grid */}
      <div className="space-y-4">
        {COUPONS.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            claimed={!!claimed[coupon.id]}
            onClaim={handleClaim}
          />
        ))}
      </div>

      {/* All claimed celebration */}
      {Object.keys(claimed).length === COUPONS.length && (
        <div className="text-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-5 text-white space-y-2">
          <div className="text-3xl">🎉🥳🎊</div>
          <p className="font-bold">Semua kupon sudah diklaim!</p>
          <p className="text-pink-100 text-xs">Bagas senang kamu udah klaim semuanya! Jangan lupa screenshot ya 💖</p>
        </div>
      )}

      {/* Note */}
      <div className="text-center pb-2">
        <p className="text-gray-300 text-[10px] italic">
          "Kupon ini berlaku seumur hidup, selama kita bersama." 💕
        </p>
      </div>

      {/* Success Modal */}
      {activeCoupon && (
        <SuccessModal coupon={activeCoupon} onClose={() => setActiveCoupon(null)} />
      )}
    </div>
  )
}
