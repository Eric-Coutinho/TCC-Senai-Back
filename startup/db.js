
// Em algum momento isso aq foi usado, mas por motivos de dar bug pra usar no
// vercel eu passei la pro index.js

const mongoose = require("mongoose");
const { Client } = require('pg')
require('dotenv').config();

const db_uri = process.env.MONGODB_CONNECT_URI;

// async function connectToDB() {
//   try {
//     await mongoose.connect(db_uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB Atlas");
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error.stack);
//   }
// }

async function connectToDB() {

  const client = new Client (db_uri)

  try {
    await client.connect();
    console.log("Connected to CockroachDB");
  } catch (error) {
    console.error("Error connecting to CockroachDB:", error.stack);
  }
}

module.exports = connectToDB;