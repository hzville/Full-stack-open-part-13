import express from "express";
import { ReadingList } from "../models/index.js";

const readingListRouter = express.Router();

readingListRouter.post("/", async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  return res.json(readingList);
});
export default readingListRouter;
