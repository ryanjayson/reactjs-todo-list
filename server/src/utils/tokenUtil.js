const jwt = require("jsonwebtoken");

//Authentical token from header request
const authenticateToken = (req, res, next) => {
  //By pass graphql routes
  if (
    req.body.query.includes("UserByEmail") ||
    req.body.query.includes("Signup")
  ) {
    next();
  } else {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Token is required for authentication" });
    }
    try {
      const splitedToken = token.split(" ")[1];
      const decoded = jwt.verify(splitedToken, process.env.MY_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

module.exports = authenticateToken;
