const mysql = require("mysql");

const { config } = require("dotenv");
config();
const dataBase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jiva-smile",
});





dataBase.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log(" connected to database");
  }
});
module.exports = { dataBase }




// Load environment variables from .env file
// const dotenv = require("dotenv");
// dotenv.config();
// const mysql = require("mysql");
// require("dotenv").config();
// module.exports = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
