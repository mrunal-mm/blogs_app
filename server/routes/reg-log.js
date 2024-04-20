const express = require('express');
const cryptojs = require('crypto-js');
const db = require('../db');

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));
  var data = { status: 'new user created', email, encryptedPassword, role };

  const query = 'INSERT INTO usertb (email, password, role) VALUES (?, ?, ?)';
  db.pool.execute(query, [email, encryptedPassword, role], (error, dbResults) => {
    if (error) {
      res.send('Internal Error');
    } else {
      res.send({ data, dbResults });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));

  const query = 'SELECT personid, email, password FROM usertb WHERE email = ?';
  db.pool.execute(query, [email], (error, dbResults) => {
    if (error) {
      res.send('error');
      return;
    }
    if (dbResults.length === 0) {
      res.send('nouser');
      return;
    }
    if (dbResults[0].password === encryptedPassword) {
      currentCustomerId = dbResults[0].personid;
      res.send('success');
      return;
    }
    res.send('wrong');
  });
});



module.exports = router;