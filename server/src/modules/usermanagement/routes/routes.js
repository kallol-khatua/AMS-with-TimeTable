const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  verification // Include the resetPassword function
} = require("../controllers/usercontroller.js");
const { forgotPassword } = require("../controllers/forgotpasswordroute.js");
const { resetPassword } = require("../controllers/resetpasswordroute.js");

router.route("/login").post(login);
router.route("/update").put(update);
router.post("/register", register);
router.post("/verify",verification)

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); // Include the new endpoint

module.exports = router;
