const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/show-all", (req, res) => {
  const query = "select * from categories";

  db.pool.execute(query, (error, dbResults) => {
    if (error) {
      res.send("Internal error.");
      return;
    }
    res.send(dbResults);
  });
});

router.post("/add", (req, res) => {
  const { title, description } = req.body;
  const query = "insert into categories (title, description) values (?, ?)";

  db.pool.execute(query, [title, description], (error, dbResults) => {
    if (error) {
      res.send("Internal error.");
      return;
    }
    res.send({status: "created new category", dbResults});
  });
});

module.exports = router;