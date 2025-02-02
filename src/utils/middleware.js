const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.log("errorHandler middleware:", error.name);
  res.status(400).send({ error: "Please check blog data" });
  next(error);
};

export { errorHandler, unknownEndpoint };
