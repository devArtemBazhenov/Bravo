const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const conn = require("../database/database");

const tokenAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    req.tokenData.email = undefined;
  } else {
    const token = req.headers.authorization.split(" ")[1];
    try {
      req.tokenData = jwt.verify(token, "userKey");
      next();
    } catch (err) {
      return res.status(401).send("There is no user");
    }
  }
};

//show order
router.get("/findorder", tokenAuth, (req, res) => {
  const userEmail = req.tokenData.email;

  conn.query(
    "SELECT * FROM posts.users WHERE email = ?",
    [userEmail],
    (err, findUser) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (findUser[0].role === 1) {
          conn.query("SELECT * FROM posts.order", (err, findOrders) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).send(findOrders);
            }
          });
        } else {
          conn.query(
            "SELECT * FROM posts.order WHERE userEmail = ?",
            [userEmail],
            (err, findOrders) => {
              if (err) {
                res.status(400).send(err);
              } else {
                res.status(200).send(findOrders);
              }
            }
          );
        }
      }
    }
  );
});

//show customer
router.get("/findcustomer", tokenAuth, (req, res) => {
  const userEmail = req.tokenData.email;

  conn.query(
    "SELECT * FROM posts.users WHERE email = ?",
    [userEmail],
    (err, findUser) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (findUser[0].role === 1) {
          conn.query("SELECT * FROM posts.customer", (err, customer) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).send(customer);
            }
          });
        } else {
          conn.query(
            "SELECT * FROM posts.customer WHERE userEmail = ?",
            [userEmail],
            (err, customer) => {
              if (err) {
                res.status(400).send(err);
              } else {
                res.status(200).send(customer);
              }
            }
          );
        }
      }
    }
  );
});

//show catalog
router.get("/findcatalog", (req, res) => {
  conn.query(
    "SELECT * FROM posts.catalog",
    (err, customer) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(customer);
      }
    }
  );
});

//search order
router.post("/searchorder", (req, res) => {
  const searchString = req.body;

  conn.query(
    "SELECT * FROM posts.order WHERE customerNumer LIKE ? or customerName LIKE ? or orderNumer LIKE ? or orderNotes LIKE ?",
    [
      `%${searchString.text}%`,
      `%${searchString.text}%`,
      `%${searchString.text}%`,
      `%${searchString.text}%`,
    ],
    (err, order) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(order);
      }
    }
  );
});

//search custom
router.post("/searchcustomer", (req, res) => {
  const searchString = req.body;

  conn.query(
    "SELECT * FROM posts.customer WHERE name LIKE ? or adress LIKE ? or numer LIKE ?",
    [
      `%${searchString.text}%`,
      `%${searchString.text}%`,
      `%${searchString.text}%`,
    ],
    (err, customer) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(customer);
      }
    }
  );
});

//search catalog
router.post("/searchcatalog", (req, res) => {
  const searchString = req.body;

  conn.query(
    "SELECT * FROM posts.catalog WHERE productCode LIKE ? or name LIKE ?",
    [
      `%${searchString.text}%`,
      `%${searchString.text}%`,
    ],
    (err, customer) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(customer);
      }
    }
  );
});

//check customer
router.get("/checkcustomer", tokenAuth, (req, res) => {
  const userEmail = req.tokenData.email;

  conn.query(
    "SELECT * FROM posts.customer WHERE userEmail = ?",
    [userEmail],
    (err, findCustom) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (findCustom.length > 0) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      }
    }
  );
});

//addCustomer
router.post("/addcustomer", tokenAuth, (req, res) => {
  const customerData = req.body;
  customerData.userEmail = req.tokenData.email;

  conn.query(
    "INSERT INTO posts.customer (userEmail, name, numer, adress, days) VALUES (?, ?, ?, ?, ?)",
    [
      customerData.userEmail,
      customerData.name,
      customerData.numer,
      customerData.adress,
      customerData.days,
    ],
    (err, save) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("Save customer");
      }
    }
  );
});

//addProduct
router.post("/addproduct", (req, res) => {
  const productData = req.body;

  conn.query(
    'SELECT * FROM posts.catalog WHERE productCode = ?',
    [productData.productCode],
    (err, find) => {
      if (err) {
        res.status(400).send(err)
      } else {
        if (find.length > 0) {
          res.status(400).send('find code')
        } else {
          conn.query(
            "INSERT INTO posts.catalog (productCode, name, unit, price, availability) VALUES (?, ?, ?, ?, ?)",
            [
              productData.productCode,
              productData.name,
              productData.unit,
              productData.price,
              productData.availability,
            ],
            (err, save) => {
              if (err) {
                res.status(400).send(err)
              } else {
                res.status(200).send(save)
              }
            }
          )
        }
      }
    }
  )
});

module.exports = router;
