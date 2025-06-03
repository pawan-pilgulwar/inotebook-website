const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET; // used for identification of token

// ROUTE 1 : Create a user using: POST "api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    // Validations
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the errors
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //Check whether the user with same email esists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      // Securing password using
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Creating and Sending authentication token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
      // res.send(user);
    } catch (error) {
      // Catching errors
      console.error(error);
      res.status(500).send("Internal server error occurd");
    }
  }
);

// ROUTE 2 : Authenticate a user using: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    // Validation
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // destructuring of data present in request
    const { email, password } = req.body;
    try {
      // finding user using email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login to correct credentials.",
        });
      }

      // Comparing requested password with user password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login to correct credentials.",
        });
      }

      // Data which to be send
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); // Creating auth token
      success = true;
      res.json({ success, authtoken }); // sending auth token
    } catch (error) {
      // catching error
      console.error(error);
      res.status(500).send("Internal server error occurd");
    }
  }
);

// ROUTE 3 : Get logedin user Details using: POST "api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    res.send({ success, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error occurd");
  }
});

module.exports = router;
