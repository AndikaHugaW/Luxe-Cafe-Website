import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query(`
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Admin orders fetch error:', error);
    // Return empty array if table doesn't exist yet to prevent crash
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { orderId, status } = await request.json();
    await query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
