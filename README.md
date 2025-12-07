# Luxe Cafe Website

Website untuk Luxe Cafe yang dibangun dengan Next.js dan Tailwind CSS.

## Teknologi yang Digunakan

- **Next.js 15** - Framework React untuk production
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety untuk JavaScript
- **Supabase** - Backend as a Service untuk database dan API

## Setup Supabase

1. Buat project di [Supabase](https://supabase.com)
2. Copy `.env.example` menjadi `.env.local`
3. Isi environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Jalankan migration SQL di Supabase SQL Editor:
   - Buka file `supabase/migrations/001_create_menu_table.sql`
   - Copy dan paste ke Supabase SQL Editor
   - Jalankan query
5. (Optional) Seed data dengan menjalankan `supabase/seed.sql`

## Memulai Development

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables (lihat Setup Supabase di atas)

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint

## API Endpoints

### Menu API

- `GET /api/menu` - Ambil semua menu items (optional query: `?category=bestseller`)
- `GET /api/menu/[id]` - Ambil menu item by ID
- `POST /api/menu` - Tambah menu item baru
- `PUT /api/menu/[id]` - Update menu item
- `DELETE /api/menu/[id]` - Hapus menu item

### Request Body untuk POST/PUT:
```json
{
  "name": "Menu Name",
  "description": "Menu description",
  "price": "Rp 35.000",
  "category": "coffee",
  "image_url": "https://example.com/image.jpg" // optional
}
```

## Struktur Project

```
.
├── app/              # App Router (Next.js 13+)
│   ├── api/         # API routes
│   │   └── menu/    # Menu API endpoints
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles dengan Tailwind
├── components/       # React components
├── lib/             # Utility functions
│   └── supabase.ts  # Supabase client
├── supabase/        # Supabase migrations & seeds
│   └── migrations/  # Database migrations
└── ...
```
