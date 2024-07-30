const Auth = require('../model/Auth');
const { getTransferToken, generateTransferToken } = require('../../services/DataUtility');
const { decrypt } = require('../../services/CryptoService');

class AuthController {
  static async Login(req, res) {
    console.log(req.body)
    const { EncryptedBody } = req.body;
    try {
      const decryptedBody = decrypt(EncryptedBody)

      const user = await Auth.findByEmail(decryptedBody.email);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const response = generateTransferToken({
        EDV: user.EDV,
        FirstName: user.FirstName,
        LastName: user.LastName,
        DisplayName: user.DisplayName,
        Email: user.Email,
        Birth: user.Birth,
        BoschId: user.BoschId,
      })
      res.status(200).send({ data: response, message: "LOGIN DONE"});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = AuthController;
