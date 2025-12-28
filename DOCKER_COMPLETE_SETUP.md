# 🐳 Complete Docker Setup Guide

Panduan lengkap untuk menjalankan **Database + API** menggunakan Docker.

---

## 📋 What You Get

Dengan setup ini, Anda akan mendapatkan:

✅ **PostgreSQL Database** - Running di Docker container  
✅ **Next.js API** - Running di Docker container  
✅ **Auto-initialization** - Database dengan 20 sample items  
✅ **Hot Reload** - Development mode dengan live reload  
✅ **Production Ready** - Production build optimization  

---

## 🚀 Quick Start

### Prerequisites

1. **Install Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop
   - Install & **RESTART COMPUTER**
   - Start Docker Desktop
   - Wait until fully running (whale icon in system tray)

2. **Verify Docker Installation**
   ```powershell
   docker --version
   docker compose version
   ```

---

## 🎯 Option 1: Development Mode (Recommended)

**Best for**: Development dengan hot reload

### Start Everything

```powershell
# Start database + app in development mode
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f
```

### What Happens:
- ✅ PostgreSQL starts on port 5432
- ✅ Database auto-initialized with sample data
- ✅ Next.js dev server starts on port 3000
- ✅ Hot reload enabled (changes auto-refresh)

### Access:
- **App**: http://localhost:3000
- **API**: http://localhost:3000/api/menu
- **Database**: localhost:5432

### Stop:
```powershell
docker compose -f docker-compose.dev.yml down
```

---

## 🏭 Option 2: Production Mode

**Best for**: Testing production build

### Build & Start

```powershell
# Build production images
docker compose build

# Start in production mode
docker compose up -d

# View logs
docker compose logs -f
```

### What Happens:
- ✅ Multi-stage build (optimized)
- ✅ Production Next.js build
- ✅ Minimal image size
- ✅ Security hardened

### Access:
- **App**: http://localhost:3000
- **API**: http://localhost:3000/api/menu

### Stop:
```powershell
docker compose down
```

---

## 🗄️ Option 3: Database Only

**Best for**: Running database only, app locally

### Start Database Only

```powershell
# Start only PostgreSQL
docker compose up -d postgres

# Or using dev compose
docker compose -f docker-compose.dev.yml up -d postgres
```

### Run App Locally

```powershell
# In another terminal
npm run dev
```

### Environment Variables

Create `.env.local`:
```env
DATABASE_URL=postgresql://luxe_admin:luxe_password_2024@localhost:5432/luxe_cafe
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key
```

---

## 🔧 Common Commands

### Development Mode

```powershell
# Start
docker compose -f docker-compose.dev.yml up -d

# Stop
docker compose -f docker-compose.dev.yml down

# Rebuild
docker compose -f docker-compose.dev.yml up -d --build

# View logs
docker compose -f docker-compose.dev.yml logs -f app
docker compose -f docker-compose.dev.yml logs -f postgres

# Restart
docker compose -f docker-compose.dev.yml restart
```

### Production Mode

```powershell
# Build
docker compose build

# Start
docker compose up -d

# Stop
docker compose down

# Rebuild
docker compose up -d --build

# View logs
docker compose logs -f
```

### Database Management

```powershell
# Connect to database
docker exec -it luxe_cafe_db psql -U luxe_admin -d luxe_cafe

# Run SQL query
docker exec luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT COUNT(*) FROM menu_items;"

# Backup database
docker exec luxe_cafe_db pg_dump -U luxe_admin luxe_cafe > backup.sql

# Restore database
Get-Content backup.sql | docker exec -i luxe_cafe_db psql -U luxe_admin luxe_cafe
```

### Container Management

```powershell
# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs luxe_cafe_app
docker logs luxe_cafe_db

# Enter container shell
docker exec -it luxe_cafe_app sh
docker exec -it luxe_cafe_db sh

# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a
```

---

## 🔄 Reset Everything

### Full Reset (⚠️ Deletes all data!)

```powershell
# Stop and remove everything
docker compose down -v

# Remove images
docker rmi luxe-cafe-website-app

# Start fresh
docker compose -f docker-compose.dev.yml up -d --build
```

---

## 📊 Verify Setup

### 1. Check Containers Running

```powershell
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                    STATUS         PORTS
xxxxx          luxe-cafe-website-app    Up 2 minutes   0.0.0.0:3000->3000/tcp
xxxxx          postgres:15-alpine       Up 2 minutes   0.0.0.0:5432->5432/tcp
```

### 2. Check Database

```powershell
# Count menu items (should be 20)
docker exec luxe_cafe_db psql -U luxe_admin -d luxe_cafe -c "SELECT COUNT(*) FROM menu_items;"
```

### 3. Test API

```powershell
# Test API endpoint
curl http://localhost:3000/api/menu
```

Or open browser: http://localhost:3000/api/menu

### 4. Test App

Open browser: http://localhost:3000

---

## 🐛 Troubleshooting

### Problem: "docker is not recognized"

**Solution:**
1. Install Docker Desktop
2. Restart computer
3. Restart PowerShell
4. Verify: `docker --version`

### Problem: Port 3000 or 5432 already in use

**Solution 1 - Stop existing services:**
```powershell
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5432

# Stop the process or change ports in docker-compose.yml
```

**Solution 2 - Change ports:**

Edit `docker-compose.dev.yml`:
```yaml
ports:
  - "3001:3000"  # App on port 3001
  - "5433:5432"  # DB on port 5433
```

### Problem: Build fails

**Solution:**
```powershell
# Clean build
docker compose down
docker system prune -a
docker compose -f docker-compose.dev.yml up -d --build
```

### Problem: Database not initialized

**Solution:**
```powershell
# Remove volume and restart
docker compose down -v
docker compose -f docker-compose.dev.yml up -d
```

### Problem: Hot reload not working

**Solution:**
- Use development mode: `docker-compose.dev.yml`
- Check volumes are mounted correctly
- Restart containers

### Problem: Cannot connect to database

**Solution:**
1. Check container is running: `docker ps`
2. Check health: `docker inspect luxe_cafe_db`
3. View logs: `docker logs luxe_cafe_db`
4. Verify DATABASE_URL in environment

---

## 📁 File Structure

```
.
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose
├── .dockerignore          # Exclude files from build
├── database/
│   └── init.sql           # Database initialization
└── ...
```

---

## 🔐 Security Notes

### Development
- ✅ Default credentials in compose files
- ✅ Containers on isolated network
- ✅ Database not exposed externally

### Production
- ⚠️ Change database password
- ⚠️ Use environment variables
- ⚠️ Enable SSL/TLS
- ⚠️ Use secrets management
- ⚠️ Implement rate limiting

---

## 📈 Performance Tips

### Development
- Use `docker-compose.dev.yml` for hot reload
- Mount volumes for live code updates
- Use Alpine images for smaller size

### Production
- Multi-stage builds reduce image size
- Standalone output optimizes Next.js
- Health checks ensure reliability
- Restart policies handle failures

---

## 🎯 Recommended Workflow

### Daily Development

```powershell
# Morning - Start everything
docker compose -f docker-compose.dev.yml up -d

# Work on your code (hot reload active)
# Changes auto-refresh

# Evening - Stop everything
docker compose -f docker-compose.dev.yml down
```

### Testing Production Build

```powershell
# Build production
docker compose build

# Test production
docker compose up

# If good, deploy
# (See deployment docs)
```

---

## 🚀 Next Steps

After setup is working:

1. ✅ Test all API endpoints
2. ✅ Add your features
3. ✅ Implement authentication
4. ⬜ Setup CI/CD
5. ⬜ Deploy to cloud

---

## 📚 Resources

- **Docker Documentation**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **Next.js Docker**: https://nextjs.org/docs/deployment#docker-image

---

## ✅ Quick Checklist

- [ ] Docker Desktop installed
- [ ] Docker Desktop running
- [ ] Chose mode (dev/prod/db-only)
- [ ] Started containers
- [ ] Verified containers running
- [ ] Tested database (20 items)
- [ ] Tested API endpoint
- [ ] Tested app in browser

---

**You're all set! Happy coding! 🎉**
