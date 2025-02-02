import express from "express";
import { PORT } from "./config/config.js";
import { connectToDatabase } from "./config/database.js";
import blogsRouter from "./controllers/blogs.js";
import "express-async-errors";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
