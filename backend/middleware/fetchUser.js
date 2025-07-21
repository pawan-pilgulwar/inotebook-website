const jwt = require("jsonwebtoken");
const User = require("../models/User");

const fetchUser = (req, res, next) => {
  //Get the use from jwt Token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!User.findById(data.user.id)) {
      return res
        .status(401)
        .send({ error: "Please authenticate using valid token" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
