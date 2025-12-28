import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { query } from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get user image from database
    const result = await query(
      'SELECT image FROM users WHERE email = $1',
      [session.user.email]
    )

    if (result.rows.length === 0 || !result.rows[0].image) {
      // Return a default transparent pixel or a 404
      return new NextResponse(null, { status: 404 })
    }

    const imageData = result.rows[0].image

    // If it's a base64 string
    if (imageData.startsWith('data:')) {
      const [header, base64] = imageData.split(',')
      const contentType = header.split(':')[1].split(';')[0]
      const buffer = Buffer.from(base64, 'base64')
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      })
    }

    // If it's a URL, redirect to it
    return NextResponse.redirect(imageData)

  } catch (error) {
    console.error('Image fetch error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
