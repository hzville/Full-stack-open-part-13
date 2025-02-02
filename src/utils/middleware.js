const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name == "SequelizeValidationError") {
    return res.status(400).send({ error: error.message });
  }
  console.log("errorHandler middleware:", error.name);
  return res.status(400).send({ error: "Please check input data" });
};

export { errorHandler, unknownEndpoint };
