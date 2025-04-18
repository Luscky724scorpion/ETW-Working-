const sanitzeDelta = (req, res, next) => {
  if (!req.body.Delta || typeof req.body.Delta !== "object") {
    return res.status(400).json({ message: "invalid delta format" });
  }
  if (!Array.isArray(req.body.Delta.ops)) {
    return res.status(400).json({ message: "invalid delta missing.ops array" });
  }
  next();
};
module.exports = sanitzeDelta;
