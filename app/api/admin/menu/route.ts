import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Helper to save file
async function saveFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads/menu');
  
  // Ensure directory exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {}

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);
  
  return `/uploads/menu/${filename}`;
}

// Get all menu items
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query('SELECT * FROM menu_items ORDER BY category, name');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Add new menu item
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile && imageFile.name !== 'undefined') {
      imageUrl = await saveFile(imageFile);
    }

    const result = await query(
      'INSERT INTO menu_items (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category, imageUrl]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Menu create error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update menu item
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File | null;
    let imageUrl = formData.get('image_url') as string;

    if (imageFile && imageFile.name !== 'undefined' && typeof imageFile !== 'string') {
      imageUrl = await saveFile(imageFile);
    }

    const result = await query(
      'UPDATE menu_items SET name = $1, description = $2, price = $3, category = $4, image_url = $5 WHERE id = $6 RETURNING *',
      [name, description, price, category, imageUrl, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Menu update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete menu item
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await query('DELETE FROM menu_items WHERE id = $1', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Menu delete error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
