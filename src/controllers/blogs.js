import express from "express";
import { Blog, User } from "../models/index.js";
import "express-async-errors";
import tokenExtractor from "../utils/tokenExtractor.js";
import { Op } from "sequelize";

const blogsRouter = express.Router();

const findBlogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get("/", async (req, res) => {
  const where = {};
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ["passwordHash", "createdAt", "updatedAt"] },
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

blogsRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

blogsRouter.delete("/:id", findBlogById, tokenExtractor, async (req, res) => {
  const blog = req.blog;
  const user = await User.findByPk(req.decodedToken.id);
  if (blog.userId === user.id) {
    await blog.destroy();
    res.status(204).send();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put("/:id", findBlogById, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

export default blogsRouter;
