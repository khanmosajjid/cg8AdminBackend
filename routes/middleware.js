const middleware = {};

middleware.verifyToken = (req, res, next) => {
  console.log("Middleware called");
  next();
};

module.exports = middleware;
