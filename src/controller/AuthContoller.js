const Auth = require('../model/Auth');
const { getData } = require('../../services/DataUtility');

class AuthController {
  static async Login(req, res) {
    console.log(req.body)
    const { EncryptedJWT } = req.body;
    try {
      const verifiedTokenPayload = getData(EncryptedJWT)
      console.log(verifiedTokenPayload)

      const user = await Auth.findByEmail(verifiedTokenPayload.email);
      console.log(user)
      if (!user) {
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
