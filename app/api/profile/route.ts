import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { query } from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const image = formData.get('image') as string

    // Validate input
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Protection: If image is the proxy URL, it means it hasn't changed
    const isProxyUrl = image && image.startsWith('/api/profile/image')
    
    // Update user profile
    console.log('Updating profile for:', session.user.email)
    
    let result
    if (isProxyUrl) {
      // Only update name
      result = await query(
        `UPDATE users 
         SET name = $1, 
             updated_at = CURRENT_TIMESTAMP
         WHERE email = $2
         RETURNING id, name, email, image, created_at, updated_at`,
        [name.trim(), session.user.email]
      )
    } else {
      // Update both name and image
      result = await query(
        `UPDATE users 
         SET name = $1, 
             image = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE email = $3
         RETURNING id, name, email, image, created_at, updated_at`,
        [name.trim(), image || null, session.user.email]
      )
    }

    if (result.rows.length === 0) {
      console.warn('Update failed: User not found', session.user.email)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const updatedUser = result.rows[0]
    console.log('Profile updated successfully for:', updatedUser.email)

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        createdAt: updatedUser.created_at,
        updatedAt: updatedUser.updated_at
      }
    })

  } catch (error: any) {
    console.error('Profile update error detailed:', {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile
    const result = await query(
      'SELECT id, name, email, image, email_verified, created_at, updated_at FROM users WHERE email = $1',
      [session.user.email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = result.rows[0]

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
