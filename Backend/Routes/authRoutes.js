const express = require("express");
const { auth } = require("../Utils/Authetication");
const {
  GoogleAuthStart,
  GoogleAuthCallback,
} = require("../Controllers/UserController");

const router = express.Router();

// Google login (final URLs: /api/v1/auth/google and /api/v1/auth/google/callback)
router.get("/auth/google", GoogleAuthStart);
router.get("/auth/google/callback", GoogleAuthCallback);

// Current user (password stripped)
router.get("/me", auth, (req, res) => {
  const user = req.RequestName.toObject
    ? req.RequestName.toObject()
    : { ...req.RequestName };

  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;

  res.json({ user });
});

module.exports = router;