import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

// GET - Ambil wishlist user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const sqlQuery = `
      SELECT 
        w.id as wishlist_id,
        m.id,
        m.name,
        m.price,
        m.image_url as image
      FROM wishlist_items w
      JOIN menu_items m ON w.menu_item_id = m.id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
    `
    const result = await query(sqlQuery, [userId])

    return NextResponse.json({ data: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Tambah item ke wishlist (Toggle logic)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { menu_item_id } = await request.json()

    if (!menu_item_id) {
      return NextResponse.json({ error: 'Menu item ID required' }, { status: 400 })
    }

    // Check if already exists
    const checkResult = await query(
      'SELECT id FROM wishlist_items WHERE user_id = $1 AND menu_item_id = $2',
      [userId, menu_item_id]
    )

    if (checkResult.rows.length > 0) {
      // Remove if exists (Toggle)
      await query(
        'DELETE FROM wishlist_items WHERE user_id = $1 AND menu_item_id = $2',
        [userId, menu_item_id]
      )
      return NextResponse.json({ message: 'Removed from wishlist', action: 'removed' }, { status: 200 })
    } else {
      // Add if not exists
      const result = await query(
        'INSERT INTO wishlist_items (user_id, menu_item_id) VALUES ($1, $2) RETURNING *',
        [userId, menu_item_id]
      )
      return NextResponse.json({ data: result.rows[0], action: 'added' }, { status: 201 })
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Hapus dari wishlist
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const menuItemId = searchParams.get('menu_item_id')

    if (!menuItemId) {
      return NextResponse.json({ error: 'Menu item ID required' }, { status: 400 })
    }

    await query(
      'DELETE FROM wishlist_items WHERE user_id = $1 AND menu_item_id = $2',
      [userId, menuItemId]
    )

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting from wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
