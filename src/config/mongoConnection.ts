import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI || "";

export function getMongo() {
  return mongoose.connect(uri);
}

export const mongoConnect = async () => {
  try {
    const connection = await getMongo();
    console.log("You have been connected to the Mongo DB");
    return connection;
  } catch (err) {
    throw new Error("Unable to connect to Mongo Db");
  }
};
