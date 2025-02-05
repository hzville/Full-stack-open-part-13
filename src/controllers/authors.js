import express from "express";
import { Blog } from "../models/index.js";
import sequelize from "sequelize";

const authorsRouter = express.Router();

authorsRouter.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      [sequelize.fn("LOWER", sequelize.col("author")), "author"],
      [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: [sequelize.fn("LOWER", sequelize.col("author"))],
  });

  res.json(authors);
});

export default authorsRouter;
