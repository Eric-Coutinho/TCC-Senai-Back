const { encrypt, decrypt } = require("./CryptoService");
const { generateJWT, verifyJWT, verifyAndDecodeJWT, decodeJWT } = require("./JWTService");

function getData(EncryptedJWT) {
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

module.exports = {
    getData
}