import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

// GET - Ambil isi keranjang user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const sqlQuery = `
      SELECT 
        c.id as cart_id,
        m.id,
        m.name,
        m.price,
        m.image_url as image,
        c.quantity
      FROM cart_items c
      JOIN menu_items m ON c.menu_item_id = m.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC
    `
    const result = await query(sqlQuery, [userId])

    return NextResponse.json({ data: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Tambah item ke keranjang
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { menu_item_id, quantity = 1 } = await request.json()

    if (!menu_item_id) {
      return NextResponse.json({ error: 'Menu item ID required' }, { status: 400 })
    }

    const sqlQuery = `
      INSERT INTO cart_items (user_id, menu_item_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, menu_item_id)
      DO UPDATE SET 
        quantity = cart_items.quantity + EXCLUDED.quantity,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    const result = await query(sqlQuery, [userId, menu_item_id, quantity])

    return NextResponse.json({ data: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update quantity atau update item
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { menu_item_id, quantity } = await request.json()

    if (!menu_item_id || quantity === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const sqlQuery = `
      UPDATE cart_items 
      SET quantity = $3, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1 AND menu_item_id = $2
      RETURNING *
    `
    const result = await query(sqlQuery, [userId, menu_item_id, quantity])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Hapus item atau kosongkan keranjang
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const menuItemId = searchParams.get('menu_item_id')

    if (menuItemId) {
      // Hapus satu item
      await query(
        'DELETE FROM cart_items WHERE user_id = $1 AND menu_item_id = $2',
        [userId, menuItemId]
      )
    } else {
      // Kosongkan keranjang
      await query('DELETE FROM cart_items WHERE user_id = $1', [userId])
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting from cart:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
