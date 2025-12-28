# 🚀 Quick Start - PostgreSQL with Docker

Panduan cepat untuk memulai development dengan PostgreSQL database.

---

## ⚡ Quick Commands

```bash
# 1. Install dependencies (sudah dilakukan)
npm install

# 2. Setup environment variables
cp .env.example .env.local

# 3. Start Docker database
docker-compose up -d

# 4. Start development server
npm run dev
```

---

## 📝 Environment Variables

Edit `.env.local`:

```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5432/luxe_cafe
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

---

## 🐳 Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs -f

# Reset database (⚠️ deletes all data)
docker-compose down -v && docker-compose up -d
```

---

## ✅ Verify Setup

### 1. Check Docker Container

```bash
docker ps
```

You should see `luxe_cafe_db` running.

### 2. Test API

Open browser: `http://localhost:3000/api/menu`

Or use curl:
```bash
curl http://localhost:3000/api/menu
```

### 3. Check Database

```bash
docker exec -it luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT COUNT(*) FROM menu_items;"
```

Should return 20 items.

---

## 📚 Full Documentation

- **Docker Setup**: `DOCKER_SETUP.md`
- **API Documentation**: `API_MENU_DOCS.md`
- **Migration Guide**: `MIGRATION_SUMMARY.md`

---

## 🆘 Troubleshooting

**Port 5432 in use?**
```bash
# Use different port
# Edit docker-compose.yml: ports: - "5433:5432"
# Update .env.local: DATABASE_URL=...@localhost:5433/...
```

**Container won't start?**
```bash
docker-compose down
docker-compose up -d
docker-compose logs
```

**Connection error?**
1. Check Docker Desktop is running
2. Verify container: `docker ps`
3. Check `.env.local` DATABASE_URL

---

**Ready to code! 🎉**
