const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const GitHubStrategy = require("passport-github2").Strategy;

  const FRONTEND_URL=process.env.FRONTEND_URL


passport.use(

  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
     
        
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
       

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avator: {
              public_id: profile.id,
              url: profile.photos[0].value
            },
            googleId: profile.id,
            authType: "google"
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
      scope: ["user:email"]
    },
    async (accessToken, refreshToken, profile, done) => {

      if (!accessToken) {
        return done(new Error("Access token not generated"));
      }
      try {
        const email =
          profile.emails?.[0]?.value ||
          `${profile.username}@github.local`;

        const query = {
          $or: [
            { githubId: profile.id },
            { email }
          ]
        };

        let user = await User.findOne(query);

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            authType: "github",
            name: profile.username,
            email,
            avator: {
              public_id: profile.id,
              url: profile.photos?.[0]?.value
            }
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("GitHub Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);



module.exports = passport;
