const nodemailer = require("nodemailer");

const conn = require("../database/database");
const mail = require("../config/mail.json");

module.exports = class User {
  constructor({ email, role }) {
    this.email = email;
    this.role = role;
  }

  save(user) {
    conn.execute(
      "INSERT INTO users (email, role) VALUES (?, ?)",
      [user.email, user.role],
      (err, res, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log("SAVE " + user.email);
        }
      }
    );
  }
};
