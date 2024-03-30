const jwt = require("jsonwebtoken");

const generateToken = (payload, expiry) => {
  const secret = process.env.SECRET_KEY;
  const options = { expiresIn: expiry };

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error(`ERROR (token_verify) : ${err.message}`);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};