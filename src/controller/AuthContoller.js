const Auth = require("../model/Auth");
const User = require("../model/User")
const {
  getTransferToken,
  generateTransferToken,
} = require("../../services/DataUtility");

const { decrypt } = require("../../services/CryptoService");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const { sendEmail_Token } = require("../../services/EmailService");
const { gen } = require('n-digit-token');

class AuthController {
  static async Login(req, res) {
    const { EncryptedBody } = req.body;
    console.log(req.body);
    try {
      const decryptedBody = decrypt(EncryptedBody);
      
      const user = await Auth.findByEmail(decryptedBody.email);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const response = generateTransferToken({
        EDV: user.EDV,
        FirstName: user.FirstName,
        LastName: user.LastName,
        DisplayName: user.DisplayName,
        Email: user.Email,
        Birth: user.Birth,
        BoschId: user.BoschId,
      });
      res.status(200).send({ data: response, message: "LOGIN DONE" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  static async sendEmail(req, res) {
    const { EDV, Email } = req.body;
    try {
      const user = await User.findById(EDV);
      console.log(req.body)
      if (user.Email != Email || user.EDV != EDV)
        res.status(400).send({ valid: false, message: "Mismatch credentials" });

      const token = gen(6)
      // console.log(token)
      await User.updateById_Token(EDV, token)
      // console.log(token)
      await sendEmail_Token("lander.gerotto@gmail.com", "Lander", token)
      // console.log(token)

      res.status(200).send({ valid: true, message: "Email sent" });

    } catch (error) {
      res.status(500).send({ valid: false, message: err.message });
    }
  }

  static async validateToken(req, res) {
    const { EDV, Email, token } = req.body;

    try {
      const user = await User.findById(EDV);
      
      if (user.Email != Email || user.EDV != EDV)
        res.status(404).send({ valid: false, message: "Mismatch credentials" });

      if (user.Recovery_Token != token)
        res.status(404).send({ valid: false, message: "Token Mismatch" });

      // const FirstName = 2
      // User.updateById(EDV, {FirstName})

      res.status(200).send({ valid: true, message: "Token Verified" });
    } catch (error) {
      res.status(500).send({ valid: false, message: err.message });
    }
  }

  static async changePassword(req, res) {
    const { EDV, Password } = req.body;

    try {
      const user = await User.findById(EDV);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      await User.updateById(EDV, { Password, Recovery_Token: '' })
      res.status(200).send({ succes: true, message: "User updated succesfully"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

}

module.exports = AuthController;
