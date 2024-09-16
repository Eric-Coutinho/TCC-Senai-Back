const Auth = require("../model/Auth");
const User = require("../model/User")
const {
  getTransferToken,
  generateTransferToken,
} = require("../../services/DataUtility");

const { decrypt } = require("../../services/CryptoService");
const { sendEmail_Token } = require("../../services/EmailService");
const { gen } = require('n-digit-token');
const { verifyJWT } = require("../../services/JWTService");
const crypto = require('crypto'); // Use built-in crypto library for generating salt and hashing

class AuthController {
  static async Login(req, res) {
    const { EncryptedBody } = req.body;
    try {
      const decryptedBody = decrypt(EncryptedBody);
      console.log(decrypt(EncryptedBody));
      
      const user = await Auth.findByEmail(decryptedBody.email);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      console.log(decryptedBody.password)
      const hashedPassword = crypto
        .pbkdf2Sync(decryptedBody.password, user.salt, 10000, 64, 'sha512')
        .toString('hex'); 
      console.log(hashedPassword)

      if(user.Password != hashedPassword)
        throw new Error("Password don't match")
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
    const { token } = req.body;

    const verifiedJWT = verifyJWT(token);
    
    if (!verifiedJWT)
      return res.status(200).send({ valid: false });

    return res.status(200).send({ valid: true });
  }

  static async validateRecoveryToken(req, res) {
    const { Email, token } = req.body;

    try {
      const user = await User.findByEmail(Email);
      
      if (user.Email != Email )
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
      res.status(200).send({ success: true, message: "User updated succesfully"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async addSaltToAllUsers(req, res) {
    try {
      // Step 1: Retrieve all users
      const data = await User.findAll(); // Assuming findAll returns all users
  
      // Step 2: Loop through all users and update their salt and hashed password
      for (const user of data) {
        const { EDV, Password } = user;
  
        // If the user already has a Salt, skip updating
        if (user.Salt) continue;
  
        // Step 3: Generate a new salt
        const salt = crypto.randomBytes(16).toString('hex');
  
        // Step 4: Hash the existing password using the new salt
        const hashedPassword = crypto
          .pbkdf2Sync(Password, salt, 10000, 64, 'sha512')
          .toString('hex');
  
        // Step 5: Update the user in the database
        const updatedUser = {
          Password: hashedPassword,  // Update to hashed password
          Salt: salt                 // Store the new salt
        };
  
        // Use updateById to save changes
        const updateResult = await User.updateById(EDV, updatedUser);
  
        if (!updateResult) {
          throw new Error(`Failed to update user with EDV: ${EDV}`);
        }
      }
  
      // Step 6: Return success
      // res.status(200).send({ success: true, message: "Users hashed successfully" });
    } catch (err) {
      // Handle errors and send response
      // res.status(500).send({ message: err.message });
    }
  }

}

module.exports = AuthController;
