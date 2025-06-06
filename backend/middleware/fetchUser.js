const jwt = require("jsonwebtoken");

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
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
