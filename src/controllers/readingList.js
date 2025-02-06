import express from "express";
import { ReadingList, User } from "../models/index.js";
import tokenExtractor from "../utils/tokenExtractor.js";

const readingListRouter = express.Router();

readingListRouter.post("/", async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  return res.json(readingList);
});

readingListRouter.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await ReadingList.findByPk(req.params.id);
  if (user.id === blog.userId) {
    blog.read = req.body.read;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

export default readingListRouter;
