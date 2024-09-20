const LocalStrategy = require("passport-local").Strategy;
const user = require("../models/user.model");

function configurePassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, passport, done) => {
        try {
          const user = await user.findOne({ email });
          if (!user) {
            return done(null, false, { message: "invalid email" });
          }
          const isMatch = await user.comparePassword(passport);
          if (!isMatch) {
            return done(null, false, { message: "invalid password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

module.exports = configurePassport;
