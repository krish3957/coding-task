'use server';
import mongoose from 'mongoose'
declare global {
    var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = 'mongodb+srv://krish3957:Krish836@cluster0.jerdoes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect