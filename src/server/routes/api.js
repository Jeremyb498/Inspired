const express = require("express");
const router = express.Router();
const path = require("path");
const loki = require("lokijs");
const jwt = require("jsonwebtoken");

const keys = require('dotenv').config({path: path.resolve(__dirname, '../env') }).parsed // Get User Variables

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

/* GET List Of Causes for "searchCause" endpoint. */
router.get("/listCauses", function(req, res, next) {
    console.log('get "listCauses" route hit');

    // A more complex solution could webscrape this page, but due to the prototype version of this project this will suffice.
    res.send({causes: listCauses()});
    
});

/* GET Search By Cause. */
router.get("/searchCause/:cause", async function(req, res, next) {
    console.log('get "searchCause" route hit');

    res.send(await searchCause(req.params.cause));
});

/* GET Random Nonprofit. AKA Suprise Me Functionality */
router.get("/supriseMe", async function(req, res, next) {
    //console.log('get "supriseMe" route hit');
    
    // Get Random Cause (index is a random index in the cause array)
    causes = listCauses();
    index = Math.floor(Math.random() * causes.length);

    // Get Random Non-Profit (index is a random index in the nonprofit array)
    data = await searchCause(causes[index]);
    index = Math.floor(Math.random() * data.nonprofits.length);

    res.send(data.nonprofits[index]);
    
});

// Create a user account, returns the same token as the "login" method. Should probably be a post method.
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

// Login to user account, returns token needs for remaining user functions.
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

// Delete User Account. Should probably be a post method.
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

// Get Starred Nonprofits
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

// Add Starred Nonprofit. Should probably be a post method.
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

// Remove Starred Nonprofit. Should probably be a post method.
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

// Functions used in several places

function listCauses()
{
    return( // Retrieved from https://docs.every.org/docs/types#causes on 11-28-2023
        [
            "aapi-led",
            "adoption",
            "afghanistan",
            "animals",
            "art",
            "athletics",
            "autism",
            "black-led",
            "buddhism",
            "cancer",
            "cats",
            "christianity",
            "climate",
            "conservation",
            "coronavirus",
            "culture",
            "dance",
            "disabilities",
            "disease",
            "dogs",
            "education",
            "environment",
            "filmandtv",
            "food-security",
            "freepress",
            "gender-equality",
            "health",
            "hinduism",
            "housing",
            "humans",
            "hurricane-ian",
            "immigrants",
            "indigenous-led",
            "indigenous-peoples",
            "islam",
            "judaism",
            "justice",
            "latine-led",
            "legal",
            "lgbt",
            "libraries",
            "mental-health",
            "museums",
            "music",
            "oceans",
            "parks",
            "poverty",
            "racial-justice",
            "radio",
            "refugees",
            "religion",
            "research",
            "science",
            "seniors",
            "space",
            "theater",
            "transgender",
            "ukraine",
            "veterans",
            "votingrights",
            "water",
            "wildfires",
            "wildlife",
            "women-led",
            "womens-health",
            "youth"
        ]
    )
}

async function searchCause(cause)
{
    // Query every.org API
    return await fetch("https://partners.every.org/v0.2/browse/" +  cause + "?apiKey=" + keys.EVERY_ORG_API_KEY)
        .then(res => res.json());
}
module.exports = router;
