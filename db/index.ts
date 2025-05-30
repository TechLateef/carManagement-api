import mongoose from "mongoose";

const DB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_CONNECTION?.replace("<db_password>", process.env.DB_PASSWORD!)
        .replace("<db_username>", process.env.DB_USERNAME!)
    : process.env.MONGO_URI;

if (!DB_URI) {
  throw new Error("❌ Database connection string is missing.");
}

let isConnected = false; 

export async function connectDB() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(DB_URI as string, {
      serverSelectionTimeoutMS: 20000, 
      socketTimeoutMS: 45000, 
    });

    isConnected = true;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

export const db = mongoose.connection;