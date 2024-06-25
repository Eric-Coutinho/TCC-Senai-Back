const jwt = require('jsonwebtoken');

// Secret key for signing and verifying JWTs
const secretKey = 'poe no dotenv'; // Replace with your own secret key

// Function to generate a JWT
function generateJWT(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Function to verify a JWT
function verifyJWT(token) {
    try {
      jwt.verify(token, secretKey);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

// Function to verify and decode a JWT
function verifyAndDecodeJWT(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Function to decode a JWT without verification
function decodeJWT(token) {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateJWT,
  verifyJWT,
  verifyAndDecodeJWT,
  decodeJWT
};
