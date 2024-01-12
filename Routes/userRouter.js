const express = require("express");
const {
  registerUser,
  loginUser,
  currentInfo,
} = require("../Controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/currentInfo").get(currentInfo);

module.exports = router;
