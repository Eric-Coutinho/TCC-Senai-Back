const Auth = require('../model/Auth');
const { decrypt } = require('../../services/CryptoService');
const { generateJWT, verifyJWT, verifyAndDecodeJWT, decodeJWT }  = require('../../services/JWTService')

class AuthController {
  static async getById(req, res) {
    console.log(req.body)
    const { EncryptedJWT } = req.body;
    const decryptedJWT = decrypt(EncryptedJWT);
    const verifiedToken = verifyAndDecodeJWT(decryptedJWT);

    try {
      if(!verifiedToken.valid)
        throw verifiedToken.error;

      const email = await Auth.findById(verifiedToken.payload.email);
      if (!email) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send({message: "LOGIN DONE"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = AuthController;
