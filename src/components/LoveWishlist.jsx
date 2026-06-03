import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ============================================================
// SUPABASE TABLE SCHEMA — Buat di SQL Editor Supabase:
// ============================================================
// CREATE TABLE wishlists (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   title text NOT NULL,
//   category text DEFAULT 'tempat',
//   note text,
//   is_done boolean DEFAULT false,
//   created_at timestamptz DEFAULT now()
// );
//
// ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Allow public read" ON wishlists FOR SELECT USING (true);
// CREATE POLICY "Allow public insert" ON wishlists FOR INSERT WITH CHECK (true);
// CREATE POLICY "Allow public update" ON wishlists FOR UPDATE USING (true);
// CREATE POLICY "Allow public delete" ON wishlists FOR DELETE USING (true);
// ============================================================

const CATEGORIES = [
  { id: 'all',      label: 'Semua',     emoji: '✨', color: 'rose' },
  { id: 'tempat',   label: 'Tempat',    emoji: '📍', color: 'blue' },
  { id: 'makanan',  label: 'Makanan',   emoji: '🍜', color: 'amber' },
  { id: 'aktivitas',label: 'Aktivitas', emoji: '🎯', color: 'purple' },
  { id: 'lainnya',  label: 'Lainnya',   emoji: '🌸', color: 'pink' },
]

const CAT_STYLE = {
  tempat:    { bg: 'bg-sky-50',    border: 'border-sky-200',    text: 'text-sky-600',    badge: 'bg-sky-100 text-sky-700',    dot: 'bg-sky-400' },
  makanan:   { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  badge: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400' },
  aktivitas: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400' },
  lainnya:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-600',   badge: 'bg-pink-100 text-pink-700',   dot: 'bg-pink-400' },
}

// ============================================================
// ADD ITEM MODAL
// ============================================================
function AddItemModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', category: 'tempat', note: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Judul wajib diisi!'); return }
    setLoading(true)
    setError('')
    try {
      const { data, error: sbError } = await supabase
        .from('wishlists')
        .insert([{ title: form.title.trim(), category: form.category, note: form.note.trim(), is_done: false }])
        .select()
      if (sbError) throw sbError
      onAdd(data[0])
      onClose()
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan. Pastikan tabel Supabase sudah dibuat dan credentials sudah benar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card rounded-t-3xl rounded-b-2xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="p-6 space-y-5">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />

          <div className="text-center">
            <h3 className="font-bold text-gray-800 text-lg">Tambah Wishlist Baru ✨</h3>
            <p className="text-gray-400 text-xs mt-1">Apa yang pengen kita lakuin atau coba bareng?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category selector */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-2">Kategori</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, category: cat.id }))}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 transition-all duration-200 ${
                      form.category === cat.id
                        ? `${CAT_STYLE[cat.id].border} ${CAT_STYLE[cat.id].bg} scale-105`
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span className={`text-[9px] font-bold ${form.category === cat.id ? CAT_STYLE[cat.id].text : 'text-gray-400'}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                {form.category === 'tempat' ? 'Nama Tempat' : form.category === 'makanan' ? 'Nama Makanan / Restoran' : 'Judulnya'} *
              </label>
              <input
                className="input-field"
                placeholder={
                  form.category === 'tempat' ? 'Contoh: Nonton sunset di Gunung Bromo 🌅' :
                  form.category === 'makanan' ? 'Contoh: Makan rawon di warung pak Suro 🍲' :
                  form.category === 'aktivitas' ? 'Contoh: Belajar masak bareng 👨‍🍳' :
                  'Contoh: Nonton film baru di bioskop 🎬'
                }
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Catatan (opsional)</label>
              <textarea
                className="input-field resize-none"
                rows={2}
                placeholder="Detail tambahan, lokasi spesifik, kapan mau kesana, dll..."
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-600">
                ⚠️ {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 text-sm">Batal</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm">
                {loading ? '⏳ Menyimpan...' : '✅ Tambahkan!'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// WISHLIST ITEM CARD
// ============================================================
function WishlistCard({ item, onToggle, onDelete }) {
  const cat = CAT_STYLE[item.category] || CAT_STYLE['lainnya']
  const catInfo = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[4]
  const [deleting, setDeleting] = useState(false)
  const [toggling, setToggling] = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    await onToggle(item.id, !item.is_done)
    setToggling(false)
  }

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(item.id)
  }

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch { return '' }
  }

  return (
    <div className={`rounded-2xl border ${item.is_done ? 'border-gray-100 bg-gray-50/80' : `${cat.border} ${cat.bg}`} p-4 transition-all duration-300`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            item.is_done
              ? 'bg-green-400 border-green-400 text-white'
              : `border-current ${cat.text} hover:opacity-70`
          }`}
        >
          {item.is_done && <span className="text-xs">✓</span>}
          {toggling && <span className="text-xs">⏳</span>}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${cat.badge}`}>
              {catInfo.emoji} {catInfo.label}
            </span>
            {item.is_done && (
              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                ✅ Udah dilakuin!
              </span>
            )}
          </div>

          <p className={`font-semibold text-sm mt-1.5 leading-snug ${item.is_done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {item.title}
          </p>

          {item.note && (
            <p className={`text-xs mt-1 leading-relaxed ${item.is_done ? 'text-gray-300' : 'text-gray-500'}`}>
              {item.note}
            </p>
          )}

          <p className="text-gray-300 text-[10px] mt-2">Ditambahkan {formatDate(item.created_at)}</p>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-gray-300 hover:text-rose-400 transition-colors duration-200 flex-shrink-0 p-1 -mr-1 -mt-1"
          title="Hapus"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ============================================================
// MAIN LOVE WISHLIST COMPONENT
// ============================================================
export default function LoveWishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDone, setShowDone] = useState(false)
  const [supabaseReady, setSupabaseReady] = useState(true)

  useEffect(() => {
    fetchItems()

    // Realtime subscription
    const channel = supabase
      .channel('wishlists-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlists' }, () => {
        fetchItems() // Refresh on any change
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setItems(data || [])
      setSupabaseReady(true)
    } catch (err) {
      console.warn('Supabase wishlists fetch error:', err.message)
      setSupabaseReady(false)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id, newDone) => {
    try {
      await supabase.from('wishlists').update({ is_done: newDone }).eq('id', id)
      setItems(prev => prev.map(i => i.id === id ? { ...i, is_done: newDone } : i))
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id) => {
    try {
      await supabase.from('wishlists').delete().eq('id', id)
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (err) { console.error(err) }
  }

  const handleAdd = (newItem) => {
    setItems(prev => [newItem, ...prev])
  }

  // Filter logic
  const filteredItems = items.filter(item => {
    const catMatch = activeFilter === 'all' || item.category === activeFilter
    const doneMatch = showDone ? true : !item.is_done
    return catMatch && doneMatch
  })

  const doneCount = items.filter(i => i.is_done).length
  const totalCount = items.length
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-cursive text-4xl text-rose-500">Our Wishlist</h2>
        <p className="text-gray-400 text-xs">Semua hal yang pengen kita lakuin bareng 🗺️</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
      </div>

      {/* Supabase not configured warning */}
      {!supabaseReady && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center space-y-1">
          <p className="text-amber-700 font-semibold text-sm">⚠️ Supabase Belum Terhubung</p>
          <p className="text-amber-600 text-xs leading-relaxed">
            Isi credentials di <code className="bg-amber-100 px-1 rounded">.env</code> dan buat tabel <code className="bg-amber-100 px-1 rounded">wishlists</code> di Supabase untuk menggunakan fitur ini.
          </p>
        </div>
      )}

      {/* Progress */}
      {totalCount > 0 && (
        <div className="timeline-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-800 text-sm">Progress Wishlist</p>
              <p className="text-gray-400 text-xs">{doneCount} dari {totalCount} sudah dilakuin! 🎉</p>
            </div>
            <div className="text-2xl font-bold text-gradient-rose font-serif">{progress}%</div>
          </div>
          <div className="bg-rose-50 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-sm font-semibold text-rose-500">
              🎉 Semua wishlist udah kelar! Keren banget kita! 🎊
            </p>
          )}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              activeFilter === cat.id
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-200'
                : 'bg-white text-gray-500 border-gray-100 hover:border-rose-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Show done toggle */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-xs font-medium">
          Menampilkan <span className="text-rose-500 font-bold">{filteredItems.length}</span> item
        </p>
        <button
          onClick={() => setShowDone(!showDone)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
            showDone ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-100 text-gray-400 hover:border-rose-200'
          }`}
        >
          {showDone ? '✅ Sembunyikan Selesai' : '👁️ Tampilkan Selesai'}
        </button>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-xs text-gray-400">Memuat wishlist...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="text-5xl">
            {activeFilter !== 'all' ? CATEGORIES.find(c => c.id === activeFilter)?.emoji : '📝'}
          </div>
          <p className="text-gray-400 font-medium text-sm">
            {items.length === 0
              ? 'Belum ada wishlist nih!'
              : showDone
              ? 'Tidak ada item yang cocok'
              : 'Semua sudah selesai! 🎉'}
          </p>
          <p className="text-gray-300 text-xs">
            {items.length === 0 ? 'Yuk, tambahkan hal pertama yang pengen kita lakuin bareng! 💕' : ''}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <WishlistCard
              key={item.id}
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add button */}
      <div className="text-center pt-2 pb-2">
        <button
          id="add-wishlist-btn"
          onClick={() => setShowModal(true)}
          disabled={!supabaseReady}
          className={`btn-primary flex items-center gap-2 mx-auto text-sm ${!supabaseReady ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>✨</span>
          <span>Tambah Wishlist Baru</span>
        </button>
        <p className="text-gray-300 text-[10px] mt-2">
          {supabaseReady ? 'Tersimpan otomatis & real-time 🌐' : 'Hubungkan Supabase terlebih dahulu'}
        </p>
      </div>

      {/* Motivational quote */}
      <div className="text-center pb-2">
        <p className="text-gray-300 text-[10px] italic px-4">
          "Setiap mimpi kecil yang kita tulis bareng, suatu hari pasti akan jadi kenangan indah." 💕
        </p>
      </div>

      {/* Add Modal */}
      {showModal && (
        <AddItemModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  )
}
