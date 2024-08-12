const Auth = require('../model/Auth');
const { getTransferToken, generateTransferToken } = require('../../services/DataUtility');
const { decrypt } = require('../../services/CryptoService');
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");


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

  static async sendEmail(req, res) {
    const mailerSend = new MailerSend({
      apiKey: 'mlsn.386bf282575dbc702955a701ff8afd89d4cf7b4b9e0ae3ac7a096eb67d1559d4',
    });
    
    const sentFrom = new Sender("a@trial-pq3enl639k5l2vwr.mlsender.net", "Test");
    
    const recipients = [
      new Recipient("lander.gerotto@gmail.com", "Lander")
    ];
    
    const personalization = [
      {
        email: "lander.gerotto@gmail.com",
        data: {
          name: 'Lander',
          Token: '123456',
          account_name: 'BPS-Cross'
        },
      }
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setTemplateId('3yxj6ljw6z1gdo2r')
      .setPersonalization(personalization);
      try {
        await mailerSend.email.send(emailParams);
        res.status(200).send({ message: "Email Sent" });
      } catch (error) {
        res.status(200).send({ message: error });
      }
  }

}

module.exports = AuthController;
