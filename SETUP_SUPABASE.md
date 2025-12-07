# Setup Supabase untuk Menu API

## 1. Install Dependencies

Jalankan perintah berikut untuk menginstall Supabase client:

```bash
npm install
```

## 2. Setup Environment Variables

1. Buat file `.env.local` di root project
2. Tambahkan environment variables berikut:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Untuk mendapatkan URL dan Key:
1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka Settings > API
4. Copy "Project URL" dan "anon public" key

## 3. Setup Database

1. Buka Supabase Dashboard > SQL Editor
2. Copy isi file `supabase/migrations/001_create_menu_table.sql`
3. Paste dan jalankan di SQL Editor
4. (Optional) Untuk seed data, jalankan juga `supabase/seed.sql`

## 4. Test API

Setelah setup selesai, test API dengan:

```bash
# Get all menu items
curl http://localhost:3000/api/menu

# Get menu by category
curl http://localhost:3000/api/menu?category=coffee
```

