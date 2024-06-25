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

function exampleUsage() {
    // Generate JWT
    const payload = {
      userId: '1234567890',
      username: 'john_doe',
      role: 'admin'
    };
    const token = generateJWT(payload);
    console.log('Generated JWT:', token);
  
    // Verify JWT
    const verifyResult = verifyJWT(token);
    if (verifyResult.valid) {
      console.log('JWT verification successful.');
    } else {
      console.log('JWT verification failed:', verifyResult.error);
    }
  
    // Verify and decode JWT
    const verifyAndDecodeResult = verifyAndDecodeJWT(token);
    if (verifyAndDecodeResult.valid) {
      console.log('JWT verification and decoding successful.');
      console.log('Decoded payload:', verifyAndDecodeResult.payload);
    } else {
      console.log('JWT verification and decoding failed:', verifyAndDecodeResult.error);
    }
  
    // Decode JWT without verification
    const decodedPayload = decodeJWT(token);
    if (decodedPayload) {
      console.log('Decoded payload without verification:', decodedPayload);
    } else {
      console.log('Failed to decode JWT without verification.');
    }
  }

module.exports = {
  generateJWT,
  verifyJWT,
  verifyAndDecodeJWT,
  decodeJWT,
  exampleUsage
};
