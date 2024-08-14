const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");


async function sendEmail_Token(recipient, recipientName, Token) {
  const mailerSend = new MailerSend({
    apiKey:
      "mlsn.386bf282575dbc702955a701ff8afd89d4cf7b4b9e0ae3ac7a096eb67d1559d4",
  });

  const sentFrom = new Sender(
    "BPS-Cross@trial-pq3enl639k5l2vwr.mlsender.net",
    "Test"
  );

  const recipients = [new Recipient(recipient, recipientName)];

  const personalization = [
    {
      email: recipient,
      data: {
        name: recipientName,
        Token: Token,
        account_name: "BPS-Cross",
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Password Recovery")
    .setTemplateId("3yxj6ljw6z1gdo2r")
    .setPersonalization(personalization);
  try {
    await mailerSend.email.send(emailParams);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  sendEmail_Token,
};
