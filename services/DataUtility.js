const { encrypt, decrypt } = require("./CryptoService");
const { generateJWT, verifyJWT, verifyAndDecodeJWT, decodeJWT } = require("./JWTService");

function getTransferToken(EncryptedJWT) {
    try {
        const decryptedJWT = decrypt(EncryptedJWT);
        const verifiedToken = verifyAndDecodeJWT(decryptedJWT);

        if (!verifiedToken.valid) {
            throw new Error(verifiedToken.error || 'Invalid JWT Signature');
        }

        return verifiedToken.payload;
    } catch (error) {
        throw new Error(`Failed to retreive data: ${error.message}`);
    }
}

function generateTransferToken(object) {
    try {
        const JWT = generateJWT(object)
        const encryptedData = encrypt(JWT);

        return encryptedData;
    } catch (error) {
        throw new Error(`Failed to encrypt data: ${error.message}`);
    }
}

module.exports = {
    getTransferToken,
    generateTransferToken
}