const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { auth } = require("../Utils/Authetication");

const router = express.Router();
  const FRONTEND_URL=process.env.FRONTEND_URL

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { email: req.user.email },
      process.env.JWT_Secrete,
      { expiresIn: "7d" }
    );
 

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`${FRONTEND_URL}`);
  }
);




router.get(
  "/auth/github/callback",
  passport.authenticate("github", { scope: ["user:email"] })
);
// GitHub callback
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${FRONTEND_URL}`,
  }),
  (req, res) => {
    const token = jwt.sign(
  { githubId: req.user.id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
    res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
});

    res.redirect(
      `${FRONTEND_URL}`
    );
  }
);


router.get("/api/v1/me", auth, (req, res) => {
  res.json({ user: req.RequestName });
});

module.exports = router;
