const express = require("express");
const db = require("../db");
const global = require("../global");

const router = express.Router();

router.post("/add-blog", (req, res) => {
  const { title, contents, category_id } = req.body;
  const user_id = global.user_id;
  const query =
    "insert into blogs (title, contents, user_id, category_id) values (?, ?, ?, ?)";

  db.pool.execute(
    query,
    [title, contents, user_id, category_id],
    (error, dbResults) => {
      if (error) {
        res.send("Internal error.");
        return;
      }
      res.send({ status: "new blog added.", dbResults });
    }
  );
});

router.put("/edit-blog", (req, res) => {
  const { title, contents, category_id, blog_id } = req.body;
  const query =
    "update blogs set title = ?, contents = ?, category_id = ? where blog_id = ?";

  db.pool.execute(
    query,
    [title, contents, category_id, blog_id],
    (error, dbResults) => {
      if (error) {
        res.send("Internal error.");
        return;
      }
      res.send({ status: "blog edited", dbResults });
    }
  );
});

router.get("/delete-blog", (req, res) => {
  const { blog_id } = req.body;
  const query = "delete from blogs where blog_id = ?";

  db.pool.execute(query, [blog_id], (error, dbResults) => {
    if (error) {
      res.send("Internal error.");
      return;
    }
    res.send({ status: "blog deleted", dbResults });
  });
});

router.get("/view-my-blogs", (req, res) => {
  const user_id = global.user_id;
  const query = "select * from blogs where user_id = ?";

  db.pool.execute(query, [user_id], (error, dbResults) => {
    if (error) {
      res.send("Internal error.");
      return;
    }
    res.send(dbResults);
  });
});

router.get("/view-all-blogs", (req, res) => {
  const user_id = global.user_id;
  const query = "select * from blogs";

  db.pool.execute(query, (error, dbResults) => {
    if (error) {
      res.send("Internal error.");
      return;
    }
    res.send(dbResults);
  });
});

module.exports = router;
