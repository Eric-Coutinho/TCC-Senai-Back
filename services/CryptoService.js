const CryptoJS = require('crypto-js');

// Secret key and initialization vector (IV) for encryption/decryption
const secretKey = 'poe no dotenv'; // Replace with your own secret key (16, 24, or 32 bytes for AES-128, AES-192, or AES-256 respectively)
// const iv = CryptoJS.lib.WordArray.random(16); // Initialization vector for AES-256-CBC (16 bytes)

// Function to encrypt data
function encrypt(data) {
  console.log(data);
    const json = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(json, secretKey).toString();
    return encryptedData;
}

// Function to decrypt data
function decrypt(encryptedData, ivHex) {
//   const iv = CryptoJS.enc.Hex.parse(ivHex);
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

module.exports = {
  encrypt,
  decrypt
};
