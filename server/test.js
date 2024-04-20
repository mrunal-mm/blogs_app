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