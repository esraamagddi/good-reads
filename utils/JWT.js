const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

const secret = process.env.SECRET_KEY; 

function JWT(user) {
  const { _id } = user; // Destructure _id from user object

  const expiresIn = "30d"; 

  const payload = {
    sub: _id,
    iat: Date.now(), 
  };

  // Create options object for JWT token
  const options = {
    expiresIn: expiresIn, 
    algorithm: "HS256", 
  };

  const signedToken = jwt.sign(payload, secret, options);

  return {
    token: "Bearer " + signedToken, 
    expires: expiresIn, 
  };
}

module.exports = { JWT }; 
