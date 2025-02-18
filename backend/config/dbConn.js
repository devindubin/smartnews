import mongoose from "mongoose";
import { logEvents } from "../middlewares/logEvents.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (error) {
    logEvents(error, "dbErrorLog.txt");
  }
};
