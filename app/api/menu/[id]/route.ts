import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { MenuItem } from '@/lib/types/menu'

// GET - Ambil menu item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sqlQuery = 'SELECT * FROM menu_items WHERE id = $1'
    const result = await query<MenuItem>(sqlQuery, [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 })
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update menu item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, price, category, image_url } = body

    const sqlQuery = `
      UPDATE menu_items
      SET name = $1,
          description = $2,
          price = $3,
          category = $4,
          image_url = $5,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `

    const result = await query<MenuItem>(sqlQuery, [
      name,
      description,
      price,
      category,
      image_url,
      params.id,
    ])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 })
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Hapus menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sqlQuery = 'DELETE FROM menu_items WHERE id = $1 RETURNING id'
    const result = await query(sqlQuery, [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
