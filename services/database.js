import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Connected to the database");
    }
    return client.db("sample_mflix");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export { connectToDatabase, client };
