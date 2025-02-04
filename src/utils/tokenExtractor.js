import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export default tokenExtractor;
