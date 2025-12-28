import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { MenuItem } from '@/lib/types/menu'

// GET - Ambil semua menu berdasarkan kategori
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let sqlQuery = 'SELECT * FROM menu_items'
    const params: any[] = []

    if (category) {
      sqlQuery += ' WHERE category = $1'
      params.push(category)
    }

    sqlQuery += ' ORDER BY id ASC'

    const result = await query<MenuItem>(sqlQuery, params)

    return NextResponse.json({ data: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Tambah menu item baru
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, price, category, image_url } = body

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const sqlQuery = `
      INSERT INTO menu_items (name, description, price, category, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `

    const result = await query<MenuItem>(sqlQuery, [
      name,
      description,
      price,
      category,
      image_url || null,
    ])

    return NextResponse.json({ data: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
