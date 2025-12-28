# 🔐 User Registration & Login Flow

Panduan lengkap alur pendaftaran dan login untuk Luxe Cafe Website.

---

## 📋 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                              │
└─────────────────────────────────────────────────────────────┘

1️⃣ NEW USER (Belum punya akun)
   │
   ├─► Click "Sign Up" button
   │
   ├─► Fill registration form:
   │   ├─ Full Name: "John Doe"
   │   ├─ Email: "john@example.com"
   │   └─ Password: "password123"
   │
   ├─► Click "Sign Up"
   │
   ├─► ✅ Account created successfully!
   │   └─ Data tersimpan di database (PostgreSQL)
   │
   ├─► 🔄 Auto-switch to Login form (2 seconds)
   │   └─ Email & password sudah ter-isi otomatis
   │
   ├─► Click "Log In"
   │
   └─► ✅ Login successful!
       └─ User masuk ke aplikasi


2️⃣ EXISTING USER (Sudah punya akun)
   │
   ├─► Click "Log In" button
   │
   ├─► Fill login form:
   │   ├─ Email: "john@example.com"
   │   └─ Password: "password123"
   │
   ├─► Click "Log In"
   │
   └─► ✅ Login successful!
       └─ User masuk ke aplikasi
```

---

## 🎯 Step-by-Step Guide

### **STEP 1: Daftar Akun Baru (Sign Up)**

1. **Buka aplikasi**: http://localhost:3000

2. **Click tombol "Sign Up"** di navbar

3. **Isi form pendaftaran**:
   ```
   Full Name: John Doe
   Email: john@example.com
   Password: password123
   ```

4. **Click "Sign Up"**

5. **Tunggu konfirmasi**:
   - ✅ Muncul pesan: "Account created successfully!"
   - 🔄 Otomatis pindah ke form Login (2 detik)
   - 📧 Email & password sudah ter-isi

6. **Data tersimpan di database**:
   ```sql
   users table:
   ├── id: 1
   ├── name: "John Doe"
   ├── email: "john@example.com"
   ├── password: "$2a$10$..." (hashed)
   └── created_at: 2024-01-01 10:00:00
   ```

---

### **STEP 2: Login dengan Akun (Log In)**

Setelah daftar berhasil, form login sudah siap:

1. **Email & password sudah ter-isi** (otomatis)

2. **Click "Log In"**

3. **Sistem akan**:
   - ✅ Verify email exists di database
   - ✅ Verify password (bcrypt compare)
   - ✅ Create session (JWT token)
   - ✅ Login successful!

4. **User masuk ke aplikasi**:
   - Modal tertutup
   - Navbar menampilkan nama user
   - Session tersimpan (tetap login)

---

## 🔄 Complete User Flow

### **Scenario 1: User Baru**

```
START
  ↓
[Homepage]
  ↓
Click "Sign Up"
  ↓
[Sign Up Modal Opens]
  ↓
Fill Form:
  - Name: John Doe
  - Email: john@example.com  
  - Password: password123
  ↓
Click "Sign Up" Button
  ↓
[API Call: POST /api/auth/signup]
  ↓
Validation:
  ✓ Email format valid
  ✓ Password length ≥ 6
  ✓ Email not exists
  ↓
Create User:
  ✓ Hash password (bcrypt)
  ✓ Save to database
  ↓
[Success Response]
  ↓
Show Success Message:
  "✅ Account created successfully!"
  ↓
Wait 2 seconds
  ↓
[Auto-switch to Login Form]
  ↓
Pre-fill:
  - Email: john@example.com
  - Password: password123
  ↓
Show Message:
  "Now you can login with your credentials"
  ↓
User clicks "Log In"
  ↓
[API Call: POST /api/auth/signin]
  ↓
Verify Credentials:
  ✓ User exists
  ✓ Password matches (bcrypt)
  ↓
Create Session:
  ✓ Generate JWT token
  ✓ Set session cookie
  ↓
[Login Success]
  ↓
Close Modal
  ↓
Refresh Page
  ↓
[User Logged In]
  ↓
END
```

### **Scenario 2: User Lama (Sudah Punya Akun)**

```
START
  ↓
[Homepage]
  ↓
Click "Log In"
  ↓
[Login Modal Opens]
  ↓
Fill Form:
  - Email: john@example.com
  - Password: password123
  ↓
Click "Log In" Button
  ↓
[API Call: POST /api/auth/signin]
  ↓
Verify Credentials:
  ✓ User exists
  ✓ Password matches
  ↓
Create Session
  ↓
[Login Success]
  ↓
Close Modal & Refresh
  ↓
[User Logged In]
  ↓
END
```

---

## ✅ Validation Rules

### **Sign Up Validation:**

| Field | Rule | Error Message |
|-------|------|---------------|
| Email | Required | "Email is required" |
| Email | Valid format | "Invalid email format" |
| Email | Unique | "User with this email already exists" |
| Password | Required | "Password is required" |
| Password | Min 6 chars | "Password must be at least 6 characters" |
| Name | Optional | - |

### **Login Validation:**

| Field | Rule | Error Message |
|-------|------|---------------|
| Email | Required | "Email is required" |
| Email | Exists in DB | "Invalid email or password" |
| Password | Required | "Password is required" |
| Password | Matches hash | "Invalid email or password" |

---

## 🧪 Testing Scenarios

### **Test 1: Successful Registration & Login**

```
1. Sign Up:
   Name: Test User
   Email: test@example.com
   Password: test123

   Expected: ✅ Account created
   Expected: 🔄 Switch to login
   Expected: 📧 Email pre-filled

2. Login:
   Email: test@example.com (pre-filled)
   Password: test123 (pre-filled)

   Expected: ✅ Login successful
   Expected: 🚪 Modal closes
   Expected: 👤 User shown in navbar
```

### **Test 2: Duplicate Email**

```
1. Sign Up (First time):
   Email: duplicate@example.com
   Password: pass123
   
   Expected: ✅ Success

2. Sign Up (Second time):
   Email: duplicate@example.com
   Password: pass456
   
   Expected: ❌ Error: "User with this email already exists"
```

### **Test 3: Invalid Login**

```
Login:
   Email: test@example.com
   Password: wrongpassword
   
   Expected: ❌ Error: "Invalid email or password"
```

### **Test 4: Email Validation**

```
Sign Up:
   Email: invalid-email
   Password: pass123
   
   Expected: ❌ Error: "Invalid email format"
```

### **Test 5: Password Length**

```
Sign Up:
   Email: test@example.com
   Password: 12345 (only 5 chars)
   
   Expected: ❌ Error: "Password must be at least 6 characters"
```

---

## 💾 Database Storage

### **After Successful Sign Up:**

```sql
-- User data in database
SELECT * FROM users WHERE email = 'john@example.com';

Result:
┌────┬───────────┬───────────────────┬──────────────────────────────────────┐
│ id │   name    │      email        │            password                   │
├────┼───────────┼───────────────────┼──────────────────────────────────────┤
│ 1  │ John Doe  │ john@example.com  │ $2a$10$abcd...xyz (bcrypt hash)     │
└────┴───────────┴───────────────────┴──────────────────────────────────────┘
```

### **Check Database:**

```powershell
# Connect to database
docker exec -it luxe_cafe_db psql -U luxe_admin -d luxe_cafe

# View all users
SELECT id, name, email, created_at FROM users;

# Count users
SELECT COUNT(*) FROM users;

# Check if specific user exists
SELECT * FROM users WHERE email = 'john@example.com';
```

---

## 🔐 Security Features

### **Password Security:**
- ✅ Hashed dengan bcrypt (salt rounds: 10)
- ✅ Never stored as plain text
- ✅ Secure comparison (timing-safe)

### **Session Security:**
- ✅ JWT tokens
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Secure session storage

### **Input Validation:**
- ✅ Email format validation
- ✅ Password length check
- ✅ SQL injection protection (parameterized queries)
- ✅ XSS protection

---

## 📱 User Experience

### **Visual Feedback:**

1. **Loading States**:
   - Button shows "Processing..." saat submit
   - Disabled state saat loading

2. **Success Messages**:
   - ✅ Green background
   - Clear success text
   - Auto-transition

3. **Error Messages**:
   - ❌ Red background
   - Clear error description
   - Stays until user fixes

4. **Auto-fill**:
   - Email & password pre-filled after signup
   - Smooth transition
   - Helper text shown

---

## 🎯 Key Features

✅ **User Registration** - Daftar dengan email & password
✅ **Email Validation** - Format email dicek
✅ **Password Hashing** - Keamanan password terjamin
✅ **Duplicate Prevention** - Email harus unique
✅ **Auto Login Prep** - Form login ter-isi otomatis
✅ **Secure Login** - Password verification
✅ **Session Management** - Stay logged in
✅ **Error Handling** - Pesan error yang jelas
✅ **Success Feedback** - Konfirmasi visual
✅ **Database Storage** - Data tersimpan permanent

---

## 📊 Flow Summary

```
User Journey:
1. Daftar (Sign Up) → Data masuk database
2. Auto-switch ke Login → Email & password ter-isi
3. Login → Verify credentials
4. Success → User masuk aplikasi

Database Flow:
1. Sign Up → INSERT INTO users
2. Login → SELECT + password verify
3. Session → JWT token created
4. Logged In → Session stored
```

---

**Flow sudah sempurna! User HARUS daftar dulu, baru bisa login.** ✅

**Test sekarang di http://localhost:3000!** 🚀
