const express = require("express");
const router = express.Router();
const { uploadProfileImage } = require("../Controllers/profileController")
router.route("/profile").post(uploadProfileImage)
module.exports=router;