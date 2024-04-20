const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const reglogRouter = require("./routes/reg-log");
const userRouter = require("./routes/user");

app.use(reglogRouter);
app.use("/user", userRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log("Server started on http:/localhost:4000");
});