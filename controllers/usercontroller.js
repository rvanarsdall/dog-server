require("dotenv").config();
var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Auth = sequelize.import("../models/userTable");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.post("/signup", function(req, res) {
  var firstName = req.body.user.firstName;
  var lastName = req.body.user.lastName;
  var email = req.body.user.email;
  var pass = req.body.user.password;
  var accountType = req.body.user.accountType;

  Auth.create({
    firstName: firstName,
    lastName: lastName,
    userName: email,
    password: bcrypt.hashSync(pass, 10),
    accountType: accountType
  }).then(
    function creatSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        user: user,
        accountType: user.accountType,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/login", function(req, res) {
  Auth.findOne({ where: { userName: req.body.user.email } }).then(
    function(email) {
      if (email) {
        bcrypt.compare(req.body.user.password, email.password, function(
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: email.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              email: email,
              accountType: email.accountType,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "failed" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    function(err) {
      res.status(501).send({ error: "user not found" });
    }
  );
});

module.exports = router;
