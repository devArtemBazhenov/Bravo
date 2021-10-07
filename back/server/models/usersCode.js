const nodemailer = require("nodemailer");

const conn = require("../database/database");
const mail = require("../config/mail.json");

module.exports = class usersCode {
  constructor({ email, userCode }) {
    this.email = email;
    this.userCode = userCode;
  }

  sendCode() {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail.email,
        pass: mail.password,
      },
    });

    transporter.sendMail({
      from: `"Bravo" ${mail.email}`,
      to: this.email,
      subject: "Confirm email",
      text: `http://localhost:4200/confirmcode/${this.userCode}`,
    });
  }

  save() {
    conn.execute(
      "INSERT INTO userscode (email, userCode) VALUES (?, ?)",
      [this.email, this.userCode],
      (err, res, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log("SAVE code");
        }
      }
    );
  }
};
