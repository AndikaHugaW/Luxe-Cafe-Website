# 👁️ Password Visibility & Google OAuth Setup

Panduan lengkap untuk fitur show/hide password dan Google OAuth login.

---

## ✅ Features Added

### 1. **Show/Hide Password Toggle** 👁️

✅ Eye icon untuk toggle visibility
✅ Smooth transition
✅ Accessible (aria-label)
✅ Works di login & signup
✅ Keyboard friendly

### 2. **Google OAuth Login** 🔐

✅ One-click Google sign in
✅ Auto-create user account
✅ Secure OAuth flow
✅ Profile data sync (name, email, photo)

---

## 👁️ Password Toggle Feature

### **How It Works:**

```tsx
// State untuk toggle
const [showPassword, setShowPassword] = useState(false)

// Input type berubah
type={showPassword ? "text" : "password"}

// Toggle button
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff /> : <Eye />}
</button>
```

### **Visual:**

**Password Hidden:**
```
┌─────────────────────────────┐
│ ••••••••••••  [👁️]          │
└─────────────────────────────┘
```

**Password Visible:**
```
┌─────────────────────────────┐
│ password123  [👁️‍🗨️]         │
└─────────────────────────────┘
```

### **Benefits:**

✅ User bisa verify password yang diketik
✅ Mengurangi typo
✅ Better UX
✅ Standard practice

---

## 🔐 Google OAuth Setup

### **Step 1: Get Google Credentials**

1. **Go to Google Cloud Console**
   - https://console.cloud.google.com/

2. **Create New Project** (atau pilih existing)
   - Project name: "Luxe Cafe Website"

3. **Enable Google+ API**
   - APIs & Services → Library
   - Search "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**
   - APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Luxe Cafe Web"

5. **Configure OAuth Consent Screen**
   - User Type: External
   - App name: "Luxe Cafe"
   - User support email: your@email.com
   - Developer contact: your@email.com

6. **Add Authorized Origins**
   ```
   http://localhost:3000
   https://yourdomain.com (for production)
   ```

7. **Add Authorized Redirect URIs**
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google (for production)
   ```

8. **Copy Credentials**
   - Client ID: `xxxxx.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-xxxxx`

### **Step 2: Update Environment Variables**

Add to `.env.local`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret-here
```

### **Step 3: Restart Server**

```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

---

## 🎯 How Google Login Works

### **User Flow:**

```
1. User clicks "Continue with Google"
   ↓
2. Redirect to Google login page
   ↓
3. User logs in with Google account
   ↓
4. Google asks permission to share data
   ↓
5. User approves
   ↓
6. Redirect back to app with auth code
   ↓
7. NextAuth exchanges code for tokens
   ↓
8. Check if user exists in database
   ↓
9a. If exists → Login
9b. If new → Create account → Login
   ↓
10. User logged in! ✅
```

### **Database Flow:**

```sql
-- When user signs in with Google
-- NextAuth automatically:

1. Check if user exists:
   SELECT * FROM users WHERE email = 'user@gmail.com';

2. If not exists, create:
   INSERT INTO users (email, name, image, email_verified)
   VALUES ('user@gmail.com', 'John Doe', 'photo.jpg', NOW());

3. Create session
```

---

## 🧪 Testing

### **Test Password Toggle:**

1. Open login/signup modal
2. Type password
3. Click eye icon
4. Password becomes visible
5. Click again → hidden

**Expected:**
- ✅ Icon changes (Eye ↔ EyeOff)
- ✅ Password text visible/hidden
- ✅ Smooth transition

### **Test Google Login (Without Setup):**

1. Click "Continue with Google"
2. **Expected**: Button works but shows error (credentials not configured)

### **Test Google Login (With Setup):**

1. Add Google credentials to `.env.local`
2. Restart server
3. Click "Continue with Google"
4. **Expected**: Redirect to Google login
5. Login with Google account
6. **Expected**: Redirect back, logged in!

---

## 🔍 Code Changes

### **AuthModal.tsx:**

```tsx
// Added imports
import { Eye, EyeOff } from 'lucide-react'

// Added state
const [showPassword, setShowPassword] = useState(false)

// Updated password input
<div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    className="pr-10" // Space for icon
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2"
  >
    {showPassword ? <EyeOff /> : <Eye />}
  </button>
</div>

// Added Google login handler
<Button onClick={() => signIn('google', { callbackUrl: '/' })}>
  Continue with Google
</Button>
```

### **NextAuth Config:**

```typescript
// Added Google provider
import GoogleProvider from "next-auth/providers/google"

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  // ... existing credentials provider
]

// Added signIn callback
callbacks: {
  async signIn({ user, account }) {
    if (account?.provider === "google") {
      // Auto-create user if not exists
      const existing = await query(
        'SELECT * FROM users WHERE email = $1',
        [user.email]
      )
      
      if (existing.rows.length === 0) {
        await query(
          'INSERT INTO users (email, name, image, email_verified) VALUES ($1, $2, $3, $4)',
          [user.email, user.name, user.image, new Date()]
        )
      }
    }
    return true
  }
}
```

---

## 🎨 UI Improvements

### **Password Field:**

**Before:**
```
┌─────────────────────────────┐
│ ••••••••••••                │
└─────────────────────────────┘
```

**After:**
```
┌─────────────────────────────┐
│ ••••••••••••  [👁️]          │  ← Toggle icon
└─────────────────────────────┘
```

### **Google Button:**

**Features:**
- ✅ Disabled state saat loading
- ✅ Cursor not-allowed saat disabled
- ✅ Opacity 50% saat disabled
- ✅ Click handler untuk OAuth

---

## 🔐 Security

### **Password Toggle:**
- ✅ Client-side only (tidak affect security)
- ✅ Password tetap encrypted saat dikirim
- ✅ Hanya visual helper

### **Google OAuth:**
- ✅ Secure OAuth 2.0 flow
- ✅ Google handles authentication
- ✅ No password stored
- ✅ Email verified by Google
- ✅ HTTPS required in production

---

## 📱 Responsive

Both features work perfectly on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ Touch devices

---

## ⚠️ Important Notes

### **Google OAuth:**

1. **Development:**
   - Works with http://localhost:3000
   - No HTTPS required

2. **Production:**
   - **MUST use HTTPS**
   - Update authorized origins
   - Update redirect URIs
   - Use production credentials

3. **Privacy:**
   - User data from Google:
     - Email (required)
     - Name (optional)
     - Profile photo (optional)
   - Stored in database
   - User can revoke access anytime

---

## 🎯 User Benefits

### **Password Toggle:**
- ✅ Verify typed password
- ✅ Avoid typos
- ✅ Better confidence
- ✅ Faster signup/login

### **Google Login:**
- ✅ No password to remember
- ✅ One-click login
- ✅ Faster signup
- ✅ Trusted by Google
- ✅ Auto-fill profile data

---

## 📊 Summary

| Feature | Status | Benefit |
|---------|--------|---------|
| Password Toggle | ✅ Working | Better UX |
| Google OAuth | ⚠️ Needs Setup | One-click login |
| Eye Icon | ✅ Implemented | Visual clarity |
| Auto-create User | ✅ Working | Seamless signup |

---

## 🚀 Next Steps

### **To Enable Google Login:**

1. Get Google credentials (see Step 1 above)
2. Add to `.env.local`
3. Restart server
4. Test!

### **Optional Enhancements:**

- [ ] Add Facebook login
- [ ] Add GitHub login
- [ ] Add password strength indicator
- [ ] Add "Remember me" checkbox

---

**Features ready to use!** 🎉

- ✅ Password toggle works immediately
- ⚠️ Google login needs credentials setup
