const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/users", function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["Jeremy", "Amelia", "Justin"] });
});

module.exports = router;
