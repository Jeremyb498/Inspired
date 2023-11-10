const express = require("express");
const router = express.Router();
const path = require("path");

const keys = require('dotenv').config({path: path.resolve(__dirname, '../.env') }).parsed // Get User Variables

/* GET users listing. */
router.get("/users", function(req, res, next) {
    console.log('get "users" route hit');
    res.send({ users: ["Jeremy", "Amelia", "Justin"] });
});

/* GET Search Terms. */
router.get("/searchTerm/:term", function(req, res, next) {
    console.log('get "searchTerm" route hit');

    // Query every.org API
    fetch("https://partners.every.org/v0.2/search/" +  req.params.term + "?apiKey=" + keys.EVERY_ORG_API_KEY)
        .then(res => res.json())
        .then(json => res.send(json));
    
    //res.send({value: "true"});
});

module.exports = router;
