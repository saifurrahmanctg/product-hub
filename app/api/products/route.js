import { NextResponse } from 'next/server';
import { getDatabase, getProducts } from '@/lib/db';

export async function GET() {
    try {
        const items = await getProducts();
        return NextResponse.json(items);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        const data = await request.json();

        if (!data.name || !data.price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newItem = {
            ...data,
            price: parseFloat(data.price),
            rating: data.rating || '4.5',
            reviews: data.reviews || '0',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newItem);

        return NextResponse.json({ ...newItem, _id: result.insertedId, id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
