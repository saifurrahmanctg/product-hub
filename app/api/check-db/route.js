import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
    try {
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        // Get collection stats
        const count = await collection.countDocuments();
        const sampleData = await collection.find({}).limit(5).toArray();
        const dbName = db.databaseName;

        return NextResponse.json({
            status: 'Connected',
            database: dbName,
            collection: process.env.DB_COLLECTION || 'products',
            totalDocuments: count,
            sample: sampleData
        });
    } catch (error) {
        return NextResponse.json({
            status: 'Disconnected',
            error: error.message
        }, { status: 500 });
    }
}
