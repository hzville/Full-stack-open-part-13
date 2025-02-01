import Sequelize from "sequelize";
import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful!");
  } catch (error) {
    console.log("Error connecting to database", error);
    return process.exit(1);
  }
  return null;
};

export { sequelize, connectToDatabase };
