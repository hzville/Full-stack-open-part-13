import express from "express";
import { LoginSession } from "../models/index.js";

const logoutRouter = express.Router();

logoutRouter.post("/", async (req, res) => {
  await LoginSession.destroy({ where: { userId: req.body.userId } });
  res.status(204).send();
});

export default logoutRouter;
