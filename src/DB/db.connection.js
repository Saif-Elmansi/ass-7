import chalk from "chalk";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sticky_notes_app");
    console.log(chalk.green("Database connected successfully"));
  } catch (error) {
    console.error(chalk.red("Database connection error:", error));
  }
};