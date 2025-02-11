import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import { User, LoginSession } from "../models/index.js";
import { JWT_SECRET } from "../config/config.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username: username, disabled: false },
  });
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (user && passwordCorrect) {
    const userToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userToken, JWT_SECRET, { expiresIn: "1h" });
    await LoginSession.destroy({ where: { userId: user.id } });
    await LoginSession.create({
      userId: user.id,
      username: user.username,
    });
    res.status(200).send({ token, username: user.username, name: user.name });
  } else {
    return res.status(401).send({ error: "invalid username or password" });
  }
});

export default loginRouter;
