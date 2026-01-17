
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/producthub";
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    console.warn("Please define the MONGODB_URI environment variable inside .env.local");
}

if (process.env.NODE_ENV === 'development') {
    
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {

    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function getDatabase() {
    const client = await clientPromise;
    return client.db(); 
}

export async function getProducts() {
    try {
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');
        let products = await collection.find({}).toArray();

        if (products.length === 0) {
            
        }

        return products.map(p => ({
            ...p,
            id: String(p._id),
            _id: String(p._id),
            price: parseFloat(p.price || 0),
            rating: p.rating || (Math.random() * 2 + 3).toFixed(1),
            reviews: p.reviews || Math.floor(Math.random() * 100),
            image: p.image || 'https://via.placeholder.com/300'
        }));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export default clientPromise;
