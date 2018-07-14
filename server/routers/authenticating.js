const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

/*
*  @signup POST
*  @dest: authenticating/signup
*  @security: public
*/
router.post("/signup", urlencodedParser, jsonParser, (req, res) => {
  console.log("signup authenticating !!!", req.body);
  res.status(201);
});

/*
*  @login POST
*  @dest: authenticating/login
*  @security: public
*/
router.post("/login", urlencodedParser, jsonParser, (req, res) => {
  console.log("login authenticating !!!", req.body);
  res.send("login");
});

module.exports = router;