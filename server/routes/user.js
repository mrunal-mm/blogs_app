const express = require("express");
const db = require('../db');
const global = require("../global")

const router = express.Router();

router.post("/add-blog", (req, res)=>{
    const {title, contents, category_id} = req.body;
    const user_id = global.user_id;
    const query = "insert into blogs (title, contents, user_id, category_id) values (?, ?, ?, ?)";

    db.pool.execute(query, [title, contents, user_id, category_id], (error, dbResults)=>{
        if (error){
            res.send("Internal error.");
        return;
        }
        res.send({status: "new blog added.", dbResults});
    })
})

module.exports = router;