const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const GitHubStrategy = require("passport-github2").Strategy;



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("h1 testing");
        
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
      callbackURL: "http://localhost:8568/api/v1/auth/github/callback",
      scope: ["user:email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;

        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            email ? { email } : {}
          ]
        });

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
