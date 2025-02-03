import { PORT } from "./config/config.js";
import { connectToDatabase } from "./config/database.js";
import app from "./app.js";

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
