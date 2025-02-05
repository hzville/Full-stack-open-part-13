import Sequelize from "sequelize";
import { DATABASE_URL } from "./config.js";
import { Umzug, SequelizeStorage } from "umzug";

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Database connection successful!");
  } catch (error) {
    console.log("Error connecting to database", error);
    return process.exit(1);
  }
  return null;
};

const migrationConf = {
  migrations: {
    glob: "src/migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export { sequelize, connectToDatabase, rollbackMigration };
