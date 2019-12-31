// this is the setup for server

"use strict";

const express = require("express");
const DB = require("./db");
const config = require("./config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const db = new DB("sqlitedb");
const app = express();
const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
const tokenExpiryTime = 3600; // in seconds - 1 hour

// CORS middleware
const enableCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(enableCrossDomain);

// for register a new user
router.post("/register", function(req, res) {
  db.insert(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8)],
    function(err) {
      if (err)
        return res.status(500).send("There was a problem in user regisration.");
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem while getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: tokenExpiryTime
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

// for user login
router.post("/login", (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    let isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ auth: false, token: null });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: tokenExpiryTime
    });
    res.status(200).send({ auth: true, token: token, user: user });
  });
});

app.use(router);
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server listening port is: " + port);
});
