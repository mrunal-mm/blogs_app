const express = require("express");
const cryptojs = require("crypto-js");
const db = require("../db");

const router = express.Router();

router.post("/register", (req, res) => {
  const { full_name, email, password, phone_no} = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));

  const data = {
    status: "new user created",
    id,
    full_name,
    email,
    password,
    encryptedPassword,
    phone_no,
    created_time
  };

  const query = "insert into user (full_name , email, password, phone_no ) VALUES (?, ?, ?,?)";

  db.pool.execute(
    query,
    [full_name, email, encryptedPassword, phone_no],
    (error, dbResults) => {
      if (error) {
        res.send("Internal Error");
      } else {
        res.send({ data, dbResults });
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
      res.send({status : "logged in successfully", dbResults});
      return;
    }
    res.send("Entered wrong credentials");
  });
});

module.exports = router;