# 🐳 Docker Setup - Luxe Cafe Database

Panduan lengkap untuk setup PostgreSQL database menggunakan Docker.

---

## ⚠️ Prerequisites

### 1. Install Docker Desktop

**Download:**
- Windows: https://www.docker.com/products/docker-desktop
- Pilih "Docker Desktop for Windows"

**System Requirements:**
- Windows 10/11 64-bit: Pro, Enterprise, or Education
- WSL 2 enabled
- Virtualization enabled in BIOS
- 4GB RAM minimum

**Installation Steps:**
1. Download installer
2. Run installer
3. Follow installation wizard
4. **RESTART COMPUTER** (penting!)
5. Start Docker Desktop
6. Wait until Docker Desktop fully running (icon di system tray)

**Verify Installation:**
```powershell
docker --version
docker compose version
```

Jika muncul error "docker is not recognized", restart PowerShell atau komputer.

---

## 🚀 Quick Start

### 1. Setup Environment Variables

Copy `.env.example` ke `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

Atau manual: duplicate `.env.example` → rename ke `.env.local`

Isi `.env.local`:
```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5432/luxe_cafe
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-this-to-random-secret-in-production
```

### 2. Start Docker Database

```powershell
docker compose up -d
```

**Output yang diharapkan:**
```
[+] Running 2/2
 ✔ Network luxe-cafe-website_default    Created
 ✔ Container luxe_cafe_db               Started
```

### 3. Verify Database Running

```powershell
# Check container status
docker ps

# Should show: luxe_cafe_db (status: Up)
```

### 4. Verify Database Initialized

```powershell
# Check if data loaded
docker exec luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT COUNT(*) FROM menu_items;"
```

**Expected output:** `20` (20 menu items)

### 5. Start Development Server

```powershell
npm run dev
```

### 6. Test API

Open browser: `http://localhost:3000/api/menu`

Or use PowerShell:
```powershell
curl http://localhost:3000/api/menu
```

---

## 🐳 Docker Commands

### Basic Commands

```powershell
# Start database
docker compose up -d

# Stop database
docker compose down

# Restart database
docker compose restart

# View logs
docker compose logs -f postgres

# Check status
docker ps

# Stop all containers
docker compose down
```

### Database Management

```powershell
# Connect to PostgreSQL CLI
docker exec -it luxe_cafe_db psql -U luxe_admin -d luxe_cafe

# Run SQL query
docker exec luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT * FROM menu_items;"

# Count menu items
docker exec luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT COUNT(*) FROM menu_items;"
```

### Reset Database

```powershell
# ⚠️ WARNING: This will DELETE ALL DATA!
docker compose down -v
docker compose up -d

# Database will be re-initialized with sample data
```

---

## 🔧 Troubleshooting

### Problem: "docker is not recognized"

**Solution:**
1. Pastikan Docker Desktop sudah terinstall
2. Restart PowerShell/Terminal
3. Restart komputer
4. Check PATH environment variable

### Problem: Port 5432 already in use

**Solution 1 - Stop existing PostgreSQL:**
```powershell
# Check what's using port 5432
netstat -ano | findstr :5432

# Stop PostgreSQL service if installed
Stop-Service postgresql-x64-15
```

**Solution 2 - Use different port:**

Edit `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Change to 5433
```

Update `.env.local`:
```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5433/luxe_cafe
```

### Problem: Container won't start

```powershell
# Check logs
docker compose logs

# Remove and recreate
docker compose down
docker compose up -d

# Full reset
docker compose down -v
docker volume prune
docker compose up -d
```

### Problem: "Cannot connect to Docker daemon"

**Solution:**
1. Start Docker Desktop
2. Wait until fully running (whale icon in system tray)
3. Try command again

### Problem: WSL 2 not installed

**Solution:**
```powershell
# Run as Administrator
wsl --install
wsl --set-default-version 2

# Restart computer
```

---

## 📊 Database Information

### Connection Details

```
Host: localhost
Port: 5432
Database: luxe_cafe
Username: luxe_admin
Password: luxe_password_2024
```

### Sample Data

Database includes 20 menu items:
- ☕ 5 Coffee items
- 🥤 4 Non-Coffee items
- 🍝 4 Food items
- 🍰 4 Dessert items
- 🥐 3 Snack items

### Database Schema

```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Security Notes

### Development (Current Setup)
- ✅ Default credentials in docker-compose.yml
- ✅ Database only accessible from localhost
- ✅ No external exposure

### Production (When Deploying)
- ⚠️ **CHANGE** database password
- ⚠️ **CHANGE** NEXTAUTH_SECRET
- ⚠️ Use environment variables for credentials
- ⚠️ Enable SSL/TLS
- ⚠️ Use managed database service

---

## 💾 Backup & Restore

### Backup Database

```powershell
# Backup to SQL file
docker exec luxe_cafe_db pg_dump -U luxe_admin luxe_cafe > backup.sql

# Backup with timestamp
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
docker exec luxe_cafe_db pg_dump -U luxe_admin luxe_cafe > "backup_$timestamp.sql"
```

### Restore Database

```powershell
# Restore from backup
Get-Content backup.sql | docker exec -i luxe_cafe_db psql -U luxe_admin luxe_cafe
```

---

## 🎯 Next Steps

After database is running:

1. ✅ Test API endpoints
2. ✅ Build your features
3. ✅ Add authentication
4. ⬜ Deploy to production

---

## 📚 Resources

- **Docker Documentation**: https://docs.docker.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Docker Desktop**: https://www.docker.com/products/docker-desktop

---

## ✅ Checklist

- [ ] Docker Desktop installed
- [ ] Docker Desktop running
- [ ] `.env.local` created and configured
- [ ] `docker compose up -d` executed
- [ ] Container running (`docker ps`)
- [ ] Database initialized (20 items)
- [ ] API tested (`/api/menu`)
- [ ] Development server running

---

**Need help? Check troubleshooting section above or Docker documentation.**

**Happy Coding! 🚀**
