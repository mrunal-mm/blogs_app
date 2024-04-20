const express = require("express");
const cryptojs = require("crypto-js");
const db = require("../db");
const global = require("../global");

const router = express.Router();

router.post("/register", (req, res) => {
  const { full_name, email, password, phone_no} = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));

  const data = {
    status: "new user created",
    full_name,
    email,
    password,
    encryptedPassword,
    phone_no
  };

  const query = "insert into user (full_name, email, password, phone_no) values (?, ?, ?,?)";

  db.pool.execute(
    query,
    [full_name, email, encryptedPassword, phone_no],
    (error) => {
      if (error) {
        res.send("Internal error");
      } else {
        res.send(data);
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));

  const query = "select * from user where email = ?";

  db.pool.execute(query, [email], (error, dbResults) => {
    if (error) {
      res.send("error");
      return;
    }
    if (dbResults.length === 0) {
      res.send("no user found");
      return;
    }
    if (dbResults[0].password === encryptedPassword) {
      
      global.user_id = dbResults[0]["user_id"];
      res.send({status: "logged in", dbResults, user_id : global.user_id});

      return;
    }
    res.send("Entered wrong credentials");
  });
});

module.exports = router;