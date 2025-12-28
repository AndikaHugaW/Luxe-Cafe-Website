import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const result = await query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          )

          const user = result.rows[0]

          if (!user || !user.password) {
            return null
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isValid) {
            return null
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            // DO NOT return large image string here, it will bloat the JWT
            image: null, 
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await query(
            'SELECT * FROM users WHERE email = $1',
            [user.email]
          )

          if (existingUser.rows.length === 0) {
            await query(
              'INSERT INTO users (email, name, image, email_verified) VALUES ($1, $2, $3, $4)',
              [user.email, user.name, user.image, new Date()]
            )
          }
        } catch (error) {
          console.error('Google sign in error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, trigger }) {
      // Always ensure image/picture is not in the token to prevent 431 error
      delete token.picture;
      delete (token as any).image;

      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = (user as any).role
      }
      
      // Always fetch or refresh user data from database to ensure role and other info is up to date
      try {
        const email = (token.email || user?.email) as string;
        if (email) {
          const result = await query(
            'SELECT id, name, email, role FROM users WHERE email = $1',
            [email]
          )
          
          if (result.rows.length > 0) {
            const dbUser = result.rows[0]
            token.id = dbUser.id.toString()
            token.name = dbUser.name
            token.email = dbUser.email
            token.role = dbUser.role
            token.imageUpdatedAt = token.imageUpdatedAt || Date.now()
          }

          // FAIL-SAFE: If this is your email, force admin role
          if (email === 'zexhuga@gmail.com') {
            token.role = 'admin';
            console.log('FAIL-SAFE: Forcing admin role for', email);
          }
        }
      } catch (error) {
        console.error('Error in JWT callback:', error)
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        console.log('SESSION CALLBACK: Passing role to session:', session.user.role);
        // Image will be fetched by the component from /api/profile
        // or we can pass a URL to an image proxy route
        session.user.image = `/api/profile/image?t=${token.imageUpdatedAt || Date.now()}`
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
