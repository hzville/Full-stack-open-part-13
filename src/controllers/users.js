import express from "express";
import { User, Blog } from "../models/index.js";
import "express-async-errors";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  const usersWithoutPassowordHash = users.map((user) => {
    const userData = user.toJSON();
    delete userData.passwordHash;
    return userData;
  });
  res.json(usersWithoutPassowordHash);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      through: {
        attributes: [],
      },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post("/", async (req, res) => {
  const { password, ...userData } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ ...userData, passwordHash });
  res.json({ ...userData });
});

usersRouter.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.newUsername;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export default usersRouter;
