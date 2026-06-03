// ============================================================
// ABOUT US — Profil Bagas & Annisah
// ============================================================
import React from 'react'

// IMPORT FOTO ASLI DARI FOLDER SRC/ASSETS
// Pastikan nama file dan ekstensinya (.jpg/.jpeg/.png) sudah sesuai dengan di folder kamu
import fotoBagas from '../assets/bagas.jpeg'
import fotoAnnisah from '../assets/annisah.jpeg'

const TODAY = new Date()
const isAnnisahBirthday = TODAY.getMonth() === 5 && TODAY.getDate() === 3   // 3 Juni
const isBagasBirthday = TODAY.getMonth() === 11 && TODAY.getDate() === 8  // 8 Desember

function ProfileCard({ imageSrc, name, birthdate, side, isBirthday, isAnniversary }) {
  return (
    <div className={`profile-card rounded-2xl p-5 flex flex-col items-center text-center space-y-3 flex-1 bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm ${isBirthday ? 'birthday-glow' : ''}`}>
      {/* Avatar Menggunakan Foto Asli */}
      <div className={`w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 ${side === 'left'
        ? 'border-sky-200'
        : 'border-rose-200'
        }`}>
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Fallback otomatis menampilkan huruf depan jika gambar gagal dimuat
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center font-bold text-gray-400 bg-gray-100 text-xl">${name.charAt(0)}</div>`;
          }}
        />
      </div>

      {/* Detail Informasi */}
      <div>
        <h3 className="font-bold text-gray-800 text-sm leading-tight">{name}</h3>
        <p className="text-gray-400 text-[11px] mt-1">{birthdate}</p>
      </div>

      {/* Badges Status */}
      <div className="flex flex-col gap-1.5 w-full">
        {isBirthday && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 flex items-center justify-center gap-1 animate-pulse">
            🎂 Happy Birthday! 🎉
          </div>
        )}
        {isAnniversary && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-3 py-2 text-xs font-semibold text-amber-700 flex items-center justify-center gap-1">
            🎊 Happy Anniversary!
          </div>
        )}
      </div>
    </div>
  )
}

export default function AboutUs() {
  return (
    <div className="page-enter space-y-8">
      {/* Header Halaman */}
      <div className="text-center space-y-2">
        <h2 className="font-cursive text-4xl text-rose-500">Tentang Kita</h2>
        <p className="text-gray-400 text-xs">Dua cerita yang akhirnya menjadi satu 💕</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
      </div>

      {/* Layout Kartu Profil Berdampingan */}
      <div className="flex gap-3">
        <ProfileCard
          imageSrc={fotoBagas}
          name="Bagas Satria Yudho Nugraha"
          birthdate="8 Desember 2004"
          side="left"
          isBirthday={isBagasBirthday}
          isAnniversary={false}
        />
        <ProfileCard
          imageSrc={fotoAnnisah}
          name="Annisah Putri Gemelli"
          birthdate="3 Juni 2005"
          side="right"
          isBirthday={isAnnisahBirthday}
          isAnniversary={false}
        />
      </div>

      {/* Catatan Hari Spesial 8 Desember */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 rounded-2xl p-5 text-center space-y-2">
        <div className="text-2xl">🌟✨🎂✨🌟</div>
        <p className="font-bold text-rose-600 text-sm">8 Desember — Hari Paling Ajaib!</p>
        <p className="text-gray-500 text-xs leading-relaxed">
          Tanggal ini bukan sembarang tanggal — ini adalah hari ulang tahun <strong className="text-rose-500">Mas Ia</strong> sekaligus hari yang penuh kenangan ketika kami resmi menjadi sepasang kekasih. Dua perayaan sekaligus dalam satu hari yang luar biasa! 🎊💑
        </p>
      </div>

      {/* Banner Khusus Ulang Tahun Annisah (Otomatis Muncul di Hari Ini!) */}
      {isAnnisahBirthday && (
        <div className="birthday-glow bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-center text-white space-y-2 shadow-md shadow-rose-500/20">
          <div className="text-3xl animate-bounce">🎂🎉🎀</div>
          <p className="font-bold text-lg">Selamat Ulang Tahun, Cimiii!</p>
          <p className="text-pink-100 text-xs leading-relaxed">
            Hari ini, 3 Juni, adalah hari paling spesial! Semoga hari-harimu selalu penuh kebahagiaan dan cinta. I love you so much! 💖
          </p>
        </div>
      )}

      {/* Footer Kalimat Romantis */}
      <div className="text-center space-y-3 pb-4">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-100 shadow-sm">
          <span className="text-sm">💑</span>
          <span className="text-xs text-gray-500 font-medium">Bersama sejak 8 Desember 2024</span>
        </div>
        <p className="text-gray-400 text-[11px] italic px-4 leading-relaxed">
          "Kamu adalah alasan terbaik kenapa aku percaya bahwa hal indah memang ada. Makasih udah hadir ya, sayang." ❤️
        </p>
      </div>
    </div>
  )
}