import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        const db = await getDatabase();
        const query = email ? { userEmail: email } : {};
        // If email provided, fetch user orders. Else fetch all (admin?) or just empty?
        // For now, let's allow fetching by email.

        const orders = await db.collection('orders').find(query).toArray();
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const db = await getDatabase();

        const result = await db.collection('orders').insertOne({
            ...body,
            status: 'Processing',
            createdAt: new Date(),
        });

        return NextResponse.json({ message: 'Order placed successfully', id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error placing order:', error);
        return NextResponse.json({ message: 'Failed to place order' }, { status: 500 });
    }
}
