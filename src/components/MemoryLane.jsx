import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

// ============================================================
// IMPORT ASET GAMBAR LOKAL DARI SRC/ASSETS
// ============================================================
import imgMog from '../assets/mogg.jpg'
import imgJumpa from '../assets/jumpa.png'
import imgJatimpark from '../assets/Jatim-park-1.webp'

// ============================================================
// DEFAULT MILESTONES (tampil jika Supabase belum dikonfigurasi
// atau tabel masih kosong)
// ============================================================
const DEFAULT_MEMORIES = [
  {
    id: 'default-1',
    title: 'Pertama Kali Ketemu 👋',
    label: 'Awal Mula Cerita',
    date: '2024-11-04', // Disesuaikan sebelum jadian di tahun 2024
    location: 'Mall MOG (Mall Olympic Garden), Malang',
    story: 'Inget banget momen canggung pas pertama kali kita tatap muka langsung di Mall MOG. Deg-degan banget waktu itu — tangan gemetar, senyum-senyum sendiri, nggak tau mau ngomong apa. Tapi begitu ketemu, semua kekakuan itu pelan-pelan mencair. Kamu dateng dengan senyum itu... dan aku langsung tau kamu beda dari yang lain. Awalnya malu-malu kucing, ternyata itu awal dari obrolan panjang kita yang nggak ada habisnya sampai sekarang. 🥹',
    image_url: imgMog, // Menggunakan hasil import gambar MOG
    color: 'rose',
    emoji: '🛍️',
  },
  {
    id: 'default-2',
    title: 'Resmi Jadian! 💑',
    label: 'Hari Paling Bahagia',
    date: '2024-12-08', // Disesuaikan pas dengan tanggal jadian asli kalian
    location: 'Jumpa Kopi – Jl. Terusan Sudimoro Jl. Manunggal No.16, Mojolangu, Lowokwaru, Malang',
    story: 'Tanggal 8 Desember 2024 — hari yang nggak akan pernah aku lupakan seumur hidup. Di Jumpa Kopi yang cozy itu, di antara aroma kopi dan lampu-lampu hangat, aku akhirnya punya keberanian buat nembak kamu. Dan kamu... bilang iya! 🥺 Yang bikin makin special? Itu sekaligus hari ulang tahunku. Kado terbaik yang pernah aku terima. Dari hari itu, kita resmi nulis cerita kita berdua. Makasih udah mau jadi bagian hidupku ya. 🎂💑',
    image_url: imgJumpa, // Menggunakan hasil import gambar Jumpa Kopi
    color: 'amber',
    emoji: '☕',
  },
  {
    id: 'default-3',
    title: 'Date Paling Berkesan 🎢',
    label: 'Petualangan Seru Bareng',
    date: '2024-02-24',
    location: 'Jatim Park 1, Kota Batu, Malang',
    story: 'Siapa sangka kencan di Jatim Park 1 bakal jadi yang paling berkesan! Naik wahana bareng, jerit-jerit bareng di roller coaster sambil pegangan tangan erat-erat — kamu ketakutan tapi tetep maksa naik buat nemeni aku. Foto-foto yang kita ambil di sana masih tersimpan rapi di galeri HP-ku. Capek tapi happy banget. Saat itu aku sadar, mau semua seru itu kita ulang terus, asal bareng kamu. 🎡❤️',
    image_url: imgJatimpark, // Menggunakan hasil import gambar Jatim Park 1
    color: 'pink',
    emoji: '🎡',
  },
]

// ============================================================
// LOVE COUNTER COMPONENT
// ============================================================
const JADIAN_DATE = new Date(2023, 11, 8, 0, 0, 0) // 8 Desember 2024, 00:00:00

function LoveCounter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const diff = now - JADIAN_DATE
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTime({ days, hours, minutes, seconds })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const CountBox = ({ value, label, color }) => (
    <div className="counter-box rounded-2xl p-3 flex flex-col items-center flex-1">
      <span className={`text-2xl font-bold font-serif ${color} tabular-nums`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mt-0.5">{label}</span>
    </div>
  )

  return (
    <div className="text-center space-y-4 mb-8">
      <div>
        <h2 className="font-cursive text-4xl text-rose-500">Our Love Counter</h2>
        <p className="text-gray-400 text-xs mt-1">Setiap detik berharga semenjak kita bersama 💕</p>
        <p className="text-gray-300 text-[10px] mt-0.5">Mulai dari 8 Desember 2023</p>
      </div>
      <div className="flex gap-2">
        <CountBox value={time.days} label="Hari" color="text-rose-500" />
        <CountBox value={time.hours} label="Jam" color="text-amber-500" />
        <CountBox value={time.minutes} label="Menit" color="text-pink-500" />
        <CountBox value={time.seconds} label="Detik" color="text-purple-400" />
      </div>
    </div>
  )
}

// ============================================================
// TIMELINE ITEM COMPONENT
// ============================================================
const colorMap = {
  rose: { dot: 'bg-rose-400', label: 'text-rose-500', border: 'border-rose-100' },
  amber: { dot: 'bg-amber-400', label: 'text-amber-500', border: 'border-amber-100' },
  pink: { dot: 'bg-pink-400', label: 'text-pink-500', border: 'border-pink-100' },
  blue: { dot: 'bg-sky-400', label: 'text-sky-500', border: 'border-sky-100' },
}
const colorKeys = ['rose', 'amber', 'pink', 'blue']

function TimelineItem({ memory, index }) {
  const ref = useRef(null)
  const color = colorMap[memory.color || colorKeys[index % colorKeys.length]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    } catch { return dateStr }
  }

  return (
    <div ref={ref} className="reveal relative pl-6" style={{ transitionDelay: `${index * 100}ms` }}>
      {/* Timeline dot */}
      <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${color.dot} timeline-dot`} />

      {/* Label */}
      <span className={`text-[11px] font-bold tracking-wider uppercase ${color.label}`}>
        {memory.label || 'Kenangan'}
      </span>

      {/* Title & date */}
      <h3 className="text-base font-bold text-gray-800 mt-0.5 leading-snug">{memory.title}</h3>
      {memory.date && (
        <p className="text-[11px] text-gray-400 mt-0.5">📅 {formatDate(memory.date)}</p>
      )}

      {/* Card */}
      <div className={`timeline-card mt-3 rounded-2xl overflow-hidden border ${color.border}`}>
        {memory.image_url && (
          <img
            src={memory.image_url}
            alt={memory.title}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}
        <div className="p-4 space-y-2">
          {memory.location && (
            <div className="flex items-start gap-1.5">
              <span className="text-xs mt-0.5">📍</span>
              <p className="text-xs text-gray-500 font-medium leading-snug">{memory.location}</p>
            </div>
          )}
          {memory.story && (
            <p className="text-xs text-gray-500 leading-relaxed">{memory.story}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ADD MEMORY MODAL
// ============================================================
function AddMemoryModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', date: '', location: '', story: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.date) { setError('Judul dan tanggal wajib diisi!'); return }
    setLoading(true)
    setError('')
    try {
      let finalImageUrl = ''

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        // Upload to Supabase Storage bucket named 'memories'
        const { error: uploadError } = await supabase.storage
          .from('memories')
          .upload(filePath, imageFile)

        if (uploadError) {
          throw new Error(`Gagal mengunggah foto: ${uploadError.message}. Pastikan Anda sudah membuat storage bucket bernama "memories" di Supabase dan mengaturnya ke Publik.`)
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('memories')
          .getPublicUrl(filePath)

        if (urlData) {
          finalImageUrl = urlData.publicUrl
        }
      }

      const { data, error: sbError } = await supabase
        .from('memories')
        .insert([{ 
          title: form.title, 
          date: form.date, 
          location: form.location, 
          story: form.story, 
          image_url: finalImageUrl 
        }])
        .select()

      if (sbError) throw sbError
      onAdd(data[0])
      onClose()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Gagal menyimpan memori. Pastikan Supabase sudah dikonfigurasi dengan benar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card rounded-t-3xl rounded-b-2xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* Handle */}
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />

          <div className="text-center">
            <h3 className="font-bold text-gray-800 text-lg">Tambah Memori Baru ✨</h3>
            <p className="text-gray-400 text-xs mt-1">Abadikan momen indah kita bersama</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Judul Momen *</label>
              <input
                className="input-field"
                placeholder="Contoh: Dinner Anniversary Pertama 🍽️"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Tanggal *</label>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Lokasi</label>
              <input
                className="input-field"
                placeholder="Contoh: Alun-alun Malang"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Cerita Singkat</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Ceritain momennya di sini... 💬"
                value={form.story}
                onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Foto Momen (opsional)</label>
              <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-4 hover:border-rose-400 transition-colors bg-white relative overflow-hidden group min-h-[120px]">
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1.5 hover:bg-rose-600 transition-colors shadow-md text-xs font-bold leading-none"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-4">
                    <span className="text-3xl mb-1">📸</span>
                    <span className="text-xs text-gray-500 font-medium">Pilih foto dari device</span>
                    <span className="text-[10px] text-gray-400 mt-1">Format: JPG, PNG, WEBP (maks. 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            setError('Ukuran file maksimal 5MB!')
                            return
                          }
                          setImageFile(file)
                          setImagePreview(URL.createObjectURL(file))
                          setError('')
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-600">
                ⚠️ {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 text-sm">
                Batal
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm">
                {loading ? '⏳ Menyimpan...' : '💾 Simpan Memori'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN MEMORY LANE COMPONENT
// ============================================================
export default function MemoryLane() {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [useDefault, setUseDefault] = useState(false)

  useEffect(() => {
    fetchMemories()

    // Realtime subscription
    const channel = supabase
      .channel('memories-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'memories' }, (payload) => {
        setMemories(prev => [...prev, { ...payload.new, color: colorKeys[prev.length % colorKeys.length] }])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const fetchMemories = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      if (data && data.length > 0) {
        setMemories(data.map((m, i) => ({ ...m, color: colorKeys[i % colorKeys.length] })))
        setUseDefault(false)
      } else {
        setUseDefault(true)
        setMemories([])
      }
    } catch (err) {
      console.warn('Supabase not configured, using default memories:', err.message)
      setUseDefault(true)
      setMemories([])
    } finally {
      setLoading(false)
    }
  }

  const displayMemories = useDefault ? DEFAULT_MEMORIES : memories

  return (
    <div className="page-enter space-y-6">
      {/* Love Counter */}
      <LoveCounter />

      {/* Section Header */}
      <div className="text-center space-y-1">
        <h2 className="font-cursive text-4xl text-rose-500">Our Memory Lane</h2>
        <p className="text-gray-400 text-xs">Perjalanan kita yang takkan terlupakan 📸</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
        {useDefault && (
          <p className="text-[10px] text-amber-500 bg-amber-50 rounded-full px-3 py-1 inline-block mt-2">
            💡 Tampilan default — hubungkan Supabase untuk data real-time
          </p>
        )}
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-xs text-gray-400">Memuat kenangan...</p>
        </div>
      ) : (
        <div className="timeline-line relative ml-4 space-y-10 pb-4">
          {displayMemories.map((memory, index) => (
            <TimelineItem key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      )}

      {/* Add Memory Button */}
      <div className="text-center pt-2">
        <button
          id="add-memory-btn"
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 mx-auto text-sm"
        >
          <span>✨</span>
          <span>Tambah Memori Baru</span>
        </button>
        <p className="text-gray-300 text-[10px] mt-2">Data tersimpan di cloud & real-time 🌐</p>
      </div>

      {/* Modal */}
      {showModal && (
        <AddMemoryModal
          onClose={() => setShowModal(false)}
          onAdd={(newMemory) => {
            setMemories(prev => [...prev, { ...newMemory, color: colorKeys[prev.length % colorKeys.length] }])
            setUseDefault(false)
          }}
        />
      )}
    </div>
  )
}