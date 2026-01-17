import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        let query = {};
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { id: id };
        }

        const product = await collection.findOne(query);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...product,
            id: String(product._id),
            _id: String(product._id)
        });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        const data = await request.json();

        const { _id, id: removedId, ...updateData } = data;

        let query = {};
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { id: id };
        }

        const result = await collection.updateOne(
            query,
            {
                $set: {
                    ...updateData,
                    price: parseFloat(updateData.price),
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        let query = {};
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { id: id };
        }

        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
