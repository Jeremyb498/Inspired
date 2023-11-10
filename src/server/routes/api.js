const express = require("express");
const router = express.Router();
const path = require("path");
const loki = require("lokijs");
const jwt = require("jsonwebtoken");

const keys = require('dotenv').config({path: path.resolve(__dirname, '../.env') }).parsed // Get User Variables

var db = new loki("Users");
var users = db.addCollection("users");

/* GET users listing. */
router.get("/users", function(req, res, next) {
    console.log('get "users" route hit');

    var myUsers = users.find();
    var result = {users: []};

    for (var i = 0; i < myUsers.length; i++)
    {
        result.users.push(myUsers[i].name);
    }

    res.send(result);
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

router.get("/addUser/:name/:hash", function(req, res, next) {
    console.log('get "addUser" hit');
    
    if (users.find({name : {'$eq' : req.params.name}}).length != 0)
    {
        res.status(400).send({message: "User: " + req.params.name + " already exists."});
        return;
    }

    users.insert({name: req.params.name, hash: req.params.hash, starred: []})
    
    res.send({
        token: jwt.sign(
            {
                name: req.params.name, 
                hash: req.params.hash
            }, 
            keys.JWT_SECRET_KEY
        )
    })
});

router.get("/login/:name/:hash", function(req, res, next) {
    console.log('get "login" hit');
    
    if (users.find({name : {'$eq' : req.params.name}}).length == 0)
    {
        res.status(400).send({message: "User: " + req.params.name + " does not exists."});
        return;
    }
    
    res.send({
        token: jwt.sign(
            {
                name: req.params.name, 
                hash: req.params.hash
            }, 
            keys.JWT_SECRET_KEY
        )
    })
});

router.get("/removeUser/:token", async function(req, res, next) {
    console.log('get "removeUser" hit');
    
    // Verify User    
    var decoded = jwt.verify(req.params.token, keys.JWT_SECRET_KEY);

    var user = users.findOne({name : {'$eq' : decoded.name}, hash : {'$eq' : decoded.hash}});

    if (user == null)
    {
        res.status(400).send({message: "Invalid User."});
        return;
    }

    await users.remove(user);

    res.send({
        message: "Deleted " +  user.name + "'s profile."
    });
});

router.get("/getStars/:token", async function(req, res, next) {
    console.log('get "getStars" hit');
    // Verify User    
    var decoded = jwt.verify(req.params.token, keys.JWT_SECRET_KEY);

    var user = users.findOne({name : {'$eq' : decoded.name}, hash : {'$eq' : decoded.hash}});

    if (user == null)
    {
        res.status(400).send({message: "Invalid User."});
        return;
    }
    
    var result = {nonprofits: []};

    // Query every.org API
    for(var i = 0; i < user.starred.length; i++)
    {
        await fetch("https://partners.every.org/v0.2/nonprofit/" +  user.starred[i] + "?apiKey=" + keys.EVERY_ORG_API_KEY)
            .then(res => res.json())
            .then(json => result.nonprofits.push(json.data.nonprofit));
    }

    res.send({
        starred: result
    });
});

router.get("/addStar/:token/:ein", async function(req, res, next) {
    console.log('get "addStar" hit');
    // Verify User
    var decoded = jwt.verify(req.params.token, keys.JWT_SECRET_KEY);

    var user = users.findOne({name : {'$eq' : decoded.name}, hash : {'$eq' : decoded.hash}});

    if (user == null)
    {
        res.status(400).send({message: "Invalid User."});
        return;
    }
    
    if (!user.starred.includes(req.params.ein))
    {
        user.starred.push(req.params.ein);
    }

    await users.update(user);

    res.send({
        message: "Added " + req.params.ein + " to " + user.name + "'s profile."
    });
});

router.get("/removeStar/:token/:ein", async function(req, res, next) {
    console.log('get "removeStar" hit');
    // Verify User
    var decoded = jwt.verify(req.params.token, keys.JWT_SECRET_KEY);

    var user = users.findOne({name : {'$eq' : decoded.name}, hash : {'$eq' : decoded.hash}});

    if (user == null)
    {
        res.status(400).send({message: "Invalid User."});
        return;
    }
    
    var i = user.starred.indexOf(req.params.ein);
    if (i >= 0)
    {
        user.starred.splice(i, 1);
    }

    await users.update(user);

    res.send({
        message: "Removed " + req.params.ein + " from " + user.name + "'s profile."
    });
});

module.exports = router;
