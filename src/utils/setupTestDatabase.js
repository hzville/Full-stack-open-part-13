import { sequelize } from "../config/database.js";

export const setupTestDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.getQueryInterface().dropAllTables();
    await sequelize.sync();
    console.log("Test database reset successful!");
  } catch (error) {
    console.error("Error setting up test database:", error);
    process.exit(1);
  }
};

export const teardown = async () => {
  await sequelize.close();
};
