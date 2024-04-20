const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('homepage');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server started on http:/localhost:4000');
});



const express = require('express');
const cryptojs = require('crypto-js');
const db = require('../db');
const router = express.Router();

router.post('/register', (req, res) => {
  const { full_name , email, password,phone_no ,created_time } = req.body;
  const encryptedPassword = String(cryptojs.SHA256(password));
  var data = { status: 'new user created', full_name , email, encryptedPassword, phone_no ,created_time };

  const query = 'INSERT INTO usertb (full_name , email, password,phone_no ,created_time ) VALUES (?, ?, ?,?,?)';
  db.pool.execute(query, [full_name , email, encryptedPassword, phone_no ,created_time ], (error, dbResults) => {
    if (error) {
      res.send('Internal Error');
    } else {
      res.send({ data, dbResults });
    }
  });
});