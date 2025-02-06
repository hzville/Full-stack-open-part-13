import { LoginSession } from "../models/index.js";

const validateSession = async (req, res, next) => {
  const session = await LoginSession.findOne({
    where: { userId: req.decodedToken.id },
  });
  if (!session) {
    return res.status(401).json({ error: "token invalid" });
  }
  next();
};

export default validateSession;
