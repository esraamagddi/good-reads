const passportJwt = require("passport-jwt");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

// Extract necessary objects from passport-jwt
const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

// Retrieve the secret key from environment variables
const secretKey = process.env.SECRET_KEY;
//console.log(secretKey);
// Define JWT extraction options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  algorithms: ["HS256"],
};

// Create JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find user by ID extracted from JWT payload
    const user = await User.findById(payload.sub);
    
    // If user exists, pass user to done callback; otherwise, pass false
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false); // Pass error to done callback
  }
});

// Export a function to initialize Passport with the JWT strategy
module.exports = (passport) => {
  passport.use(jwtStrategy);
};
