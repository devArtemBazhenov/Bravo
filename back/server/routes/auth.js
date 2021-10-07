const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const UsersCode = require('../models/usersCode')
const conn = require("../database/database");

//request
router.post("/authorization", (req, res) => {
  const userData = req.body;
  const userCode = Math.floor(Math.random() * (1000000 - 100000) + 100000);

  const usersCode = new UsersCode({email: userData.email, userCode: userCode});

  conn.query(
    "SELECT * FROM posts.userscode WHERE email = ?",
    [userData.email],
    (err, findUser) => {
      if (err) {
        console.log(err)
      } else {
        if (findUser.length > 0) {
          res.status(400).send('The code has already sent to your email')
        } else {
          //usersCode.sendCode()
          usersCode.save()
          res.status(200).send('Code sended')
        }
      }
    }
  )
});

router.post('/checkcodeauthorize', (req, res) => {
  const userCode = req.body

  conn.query(
    "SELECT * FROM posts.userscode WHERE userCode = ?",
    [userCode.code],
    (err, findUser) => {
      if (err) {
        console.log(err)
      } else {
        if (findUser.length > 0) {
          const data = new Date().toLocaleTimeString();

          const hour = findUser[0].created.toString().split(':')[0].split(' ')[4]
          const minute = findUser[0].created.toString().split(':')[1];
          const second = findUser[0].created.toString().split(':')[2].split(' ')[0];
          const createCodeData = hour + ':' + (Number(minute) + 15) + ':' + second;

          if (createCodeData <= data) {
            conn.query(
              'DELETE FROM posts.userscode WHERE userCode = ?',
              [userCode.code]
            );

            res.status(400).send(
              'Time for confirmation has expired, try to get the code again'
            )
          } else {
            conn.query(
              "SELECT * FROM posts.userscode WHERE userCode = ?",
              [userCode.code],
              (err, findUser) => {
                if (err) {
                  console.log(err)
                } else {
                  const userData = {email: findUser[0].email, role: 0}
                  const user = new User(userData);

                  conn.query(
                    "SELECT * FROM posts.users WHERE email = ?",
                    [user.email],
                    (err, findUser) => {
                      if (err) {
                        console.log(err);
                      } else {
                        if (findUser.length > 0) {
                          let payload = { email: user.email };
                          let token = jwt.sign(payload, "userKey");
                          res.status(200).send({ token });

                          conn.query(
                            'DELETE FROM posts.userscode WHERE userCode = ?',
                            [userCode.code]
                          );
                        } else {
                          user.save(userData);
                          let payload = { email: user.email };
                          let token = jwt.sign(payload, "userKey");
                          res.status(200).send({ token });

                          conn.query(
                            'DELETE FROM posts.userscode WHERE userCode = ?',
                            [userCode.code]
                          );
                        }
                      }
                    }
                  );
                }
              }
            )
          }
        } else {
          res.status(400).send('Code not exist')
        }
      }
    }
  )
})

module.exports = router;
