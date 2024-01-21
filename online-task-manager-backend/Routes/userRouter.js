const express = require("express");
const {
  registerUser,
  loginUser,
  currentInfo,
} = require("../Controllers/userController");
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const nodeMailer = require("../middlewares/nodeMailer");
const router = express.Router();

router.route("/register").post(nodeMailer, registerUser);
router.route("/login").post(loginUser);
router.get("/currentInfo", validateTokenHandler, currentInfo);

module.exports = router;
