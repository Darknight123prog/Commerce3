const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { auth } = require("../Utils/Authetication");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log(req.user);
    const token = jwt.sign(
      { email: req.user.email },
      process.env.JWT_Secrete,
      { expiresIn: "7d" }
    );
 

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    res.redirect("http://localhost:5173");
  }
);

router.get("/me", auth, (req, res) => {
  console.log('after auth data user',req.RequestName);
  res.json({ user: req.RequestName });
});

module.exports = router;
