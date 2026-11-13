# Portofolio Praja Lohphinesti Subiarto

Situs portofolio satu halaman (React + Vite + Tailwind CSS v4), dua bahasa (English / Bahasa Indonesia).

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # hasil di folder dist/
npm run preview  # cek hasil build
```

`dist/` memakai path relatif, jadi bisa langsung di-upload ke GitHub Pages, Netlify, Vercel, atau hosting statis apa pun.

## Mengubah isi

Semua teks, proyek, keahlian, dan tautan ada di **`src/content.ts`** (versi `en` dan `id`). Foto profil: `public/profile.jpeg`.

- **Email dan CV:** isi `profile.email` dan `profile.cv` (mis. `'cv-praja.pdf'`, taruh file PDF-nya di `public/`). Tombol "Download CV" dan ikon email otomatis muncul.
- **Studi kasus proyek:** tiap proyek punya `overview`, `problem`, `approach`, dan `decisions`. Teks ini ditulis dari deskripsi proyek yang ada; sebaiknya dicek dan dilengkapi dengan detail asli (dataset, skor, hasil).
- **Logo tools:** daftar `stackLogos`, memakai ikon dari paket `simple-icons`.
- **Statistik GitHub** di halaman About diambil langsung dari API GitHub (`profile.githubUser`). Angka yang masih 0 disembunyikan otomatis.

## Halaman

Situs memakai hash routing, jadi tiap halaman punya alamat sendiri dan tombol Back browser berfungsi, tanpa perlu konfigurasi server:

| Alamat | Halaman |
|---|---|
| `#home` | Beranda (hero, peran berganti otomatis, statistik) |
| `#about` | Tentang, pendidikan, timeline |
| `#projects` | Proyek dengan filter kategori |
| `#skills` | Kartu keahlian dan marquee |
| `#contact` | Kontak dan media sosial |
| `#work-<slug>` | Studi kasus tiap proyek, mis. `#work-face-antispoofing` |

## Struktur

```text
src/
├── content.ts            # semua copy & data (EN + ID)
├── router.tsx            # routing, transisi tirai, preloader
├── App.tsx
├── contexts/LanguageContext.tsx
├── components/
│   ├── Nav.tsx           # navbar kaca, pill aktif yang bergeser, menu mobile
│   ├── Background.tsx    # aurora ungu-biru yang bergerak
│   ├── Cursor.tsx        # kursor custom (desktop saja)
│   ├── Page.tsx          # header halaman, tombol "halaman berikutnya", footer
│   ├── Visuals.tsx       # ilustrasi SVG per proyek
│   └── ui.tsx            # RevealText, FadeUp, Magnetic, CountUp, Tilt, ikon
│   └── Logos.tsx         # logo tools (simple-icons) + strip berjalan
└── pages/                # Home, About, Projects, ProjectDetail, Skills, Contact
```

## Animasi

- Preloader dengan hitungan 0–100 saat pertama dibuka.
- Pindah halaman: tirai gradasi naik menutupi layar sambil menampilkan nama halaman tujuan, lalu terangkat dan konten baru muncul.
- Judul muncul kata per kata, angka statistik menghitung naik, timeline tergambar saat di-scroll.
- Kartu miring mengikuti mouse dan tepinya menyala di titik kursor; tombol "magnetik"; filter proyek dengan animasi susun ulang.
- Semua animasi otomatis diredam bila pengguna memilih *reduce motion* di sistemnya.

Dibangun dengan React, Vite, Tailwind CSS v4, Motion, dan lucide-react. Font: Sora (di-host sendiri).
