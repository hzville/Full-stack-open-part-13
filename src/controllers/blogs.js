import express from "express";
import { Blog } from "../models/index.js";
import "express-async-errors";

const blogsRouter = express.Router();

const findBlogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

blogsRouter.delete("/:id", findBlogById, async (req, res) => {
  const blog = req.blog;
  if (blog) {
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
