# Panduan Perubahan Warna ke Orange

## Warna yang Ditambahkan di tailwind.config.js:
- `primary`: #ff6b35 (Orange utama)
- `primary-dark`: #e55a2b (Orange gelap)
- `primary-light`: #ff8c61 (Orange terang)

## Perubahan Global yang Perlu Dilakukan:

### 1. Ganti di Semua Komponen:
- `text-dark-blue` → `text-primary`
- `bg-dark-blue` → `bg-primary`
- `border-dark-blue` → `border-primary`
- `hover:text-dark-blue` → `hover:text-primary`
- `hover:bg-dark-blue` → `hover:bg-primary`
- `ring-dark-blue` → `ring-primary`
- `shadow-dark-blue` → `shadow-primary`

### 2. Komponen yang Sudah Diupdate:
✅ Navbar.tsx - Logo dan menu items sekarang orange
✅ tailwind.config.js - Warna primary ditambahkan

### 3. Komponen yang Perlu Diupdate:
- [ ] Hero.tsx
- [ ] About.tsx
- [ ] AboutDetail.tsx
- [ ] Features.tsx
- [ ] feature-steps.tsx
- [ ] membership-pricing.tsx
- [ ] Testimonials.tsx
- [ ] testimonials-columns.tsx
- [ ] Footer.tsx
- [ ] MenuPreview.tsx
- [ ] Newsletter.tsx

### 4. Cara Cepat Update (Manual):
Gunakan Find & Replace di VS Code:
1. Buka Search (Ctrl+Shift+F)
2. Find: `dark-blue`
3. Replace: `primary`
4. Review setiap perubahan sebelum apply

### 5. Catatan Penting:
- Beberapa komponen mungkin perlu penyesuaian manual untuk gradient
- Pastikan contrast ratio tetap baik untuk accessibility
- Test di semua breakpoints setelah perubahan
