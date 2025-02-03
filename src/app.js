import express from "express";
import "express-async-errors";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
