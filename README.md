# Luxe Cafe Website

Website untuk Luxe Cafe yang dibangun dengan Next.js, TypeScript, dan PostgreSQL.

## 🚀 Teknologi yang Digunakan

- **Next.js 15** - Framework React untuk production
- **TypeScript** - Type safety untuk JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostgreSQL** - Database relational
- **Docker** - Containerization untuk database
- **Framer Motion** - Animasi yang smooth

---

## 🐳 Setup Database + API

Anda punya **3 pilihan** untuk menjalankan aplikasi:

### Option 1: Full Docker (Database + API) ⭐ **Easiest**

Jalankan database DAN aplikasi di Docker:

```bash
# Development mode (with hot reload)
docker compose -f docker-compose.dev.yml up -d

# Production mode
docker compose up -d
```

**Keuntungan:**
- ✅ Setup paling mudah (1 command)
- ✅ Tidak perlu install Node.js
- ✅ Semua ter-containerized
- ✅ Hot reload di dev mode

### Option 2: Database Docker + App Local

Jalankan database di Docker, app di local:

```bash
# Start database only
docker compose up -d postgres

# Run app locally
npm install
npm run dev
```

**Keuntungan:**
- ✅ Faster development
- ✅ Easier debugging
- ✅ Direct code access

### Option 3: All Local (No Docker)

Install PostgreSQL manual, run app local.

**See**: `DOCKER_SETUP.md` untuk panduan lengkap.

---

## ⚡ Quick Start (Recommended)

### Prerequisites

1. **Install Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Install & **RESTART COMPUTER**

2. **Verify Docker**
   ```bash
   docker --version
   ```

### Start Development

```bash
# Start everything (database + app)
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Open browser
# http://localhost:3000
```

### Stop

```bash
docker compose -f docker-compose.dev.yml down
```

**Full Guide**: `DOCKER_COMPLETE_SETUP.md`

---

## 💻 Local Development (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

**Option A - Use Docker for DB only:**
```bash
docker compose up -d postgres
```

**Option B - Install PostgreSQL manually**  
See `DOCKER_SETUP.md`

### 3. Setup Environment

Create `.env.local`:
```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5432/luxe_cafe
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📜 Scripts

```bash
npm run dev      # Development server
npm run build    # Build untuk production
npm run start    # Production server
npm run lint     # ESLint check
```

---

## 🔌 API Endpoints

### Menu API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu?category=coffee` | Filter by category |
| GET | `/api/menu/[id]` | Get menu by ID |
| POST | `/api/menu` | Create new menu item |
| PUT | `/api/menu/[id]` | Update menu item |
| DELETE | `/api/menu/[id]` | Delete menu item |

### Request Body (POST/PUT):

```json
{
  "name": "Cappuccino",
  "description": "Classic Italian coffee",
  "price": 35000,
  "category": "coffee",
  "image_url": "https://example.com/image.jpg"
}
```

**Full API Documentation**: `API_MENU_DOCS.md`

---

## 📁 Struktur Project

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── menu/          # Menu CRUD endpoints
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── MenuList.tsx      # Menu display
│   └── ...
├── lib/                   # Utilities
│   ├── db.ts             # PostgreSQL connection
│   ├── api/              # API helpers
│   └── types/            # TypeScript types
├── database/              # Database files
│   └── init.sql          # Initialization script
├── docker-compose.yml     # Docker configuration
└── ...
```

---

## 🐳 Docker Commands

```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# View logs
docker compose logs -f

# Reset database (⚠️ deletes all data)
docker compose down -v && docker compose up -d

# Connect to database
docker exec -it luxe_cafe_db psql -U luxe_admin -d luxe_cafe
```

---

## 📚 Documentation

- **`DOCKER_SETUP.md`** - Panduan lengkap Docker setup & troubleshooting
- **`API_MENU_DOCS.md`** - Dokumentasi lengkap API endpoints
- **`MIGRATION_SUMMARY.md`** - Summary migrasi database
- **`QUICKSTART_DOCKER.md`** - Quick start guide

---

## 🎯 Features

- ✅ Responsive design
- ✅ Smooth animations (Framer Motion)
- ✅ RESTful API
- ✅ TypeScript type safety
- ✅ PostgreSQL database
- ✅ Docker containerization
- ✅ Sample data included

---

## 🔐 Security Notes

**Development:**
- Default credentials in `docker-compose.yml`
- Database only accessible from localhost

**Production:**
- Change database password
- Use environment variables
- Enable SSL/TLS
- Use managed database service

---

## 🆘 Troubleshooting

### Docker not found?
- Install Docker Desktop
- Restart computer
- Restart terminal

### Port 5432 in use?
- See `DOCKER_SETUP.md` for solutions

### Database connection error?
- Check Docker Desktop is running
- Verify `.env.local` configuration
- Run `docker ps` to check container

**Full troubleshooting guide**: `DOCKER_SETUP.md`

---

## 📝 License

This project is for educational purposes.

---

**Happy Coding! ☕🚀**
