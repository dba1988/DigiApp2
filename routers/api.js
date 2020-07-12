const express = require("express");
const routerapi = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
//User Modle
const User = require("../moduls/User");

const jwt = require("jsonwebtoken");
//Get All Users router
routerapi.get("/digiusers", (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  //res.json(DigiUser);
});
//Get User By Name router
routerapi.get("/digiusersbyname/:name", async (req, res) => {
  User.find({ name: new RegExp(req.params.name, "i") }).then((user) => {
    if (user) {
      res.json(user);
    }
  });
});
// Register Handler

routerapi.post("/register", (req, res) => {
  //console.log(JSON.parse(JSON.stringify(req.body)));
  //res.send(req.body);
  const { name, email, password, repassword } = req.body;
  let errors = [];
  if (!name || !email || !password || !repassword) {
    errors.push({ msg: "Please Provide all Data", isAdded: false });
  }

  //check Password match
  if (password !== repassword) {
    errors.push({ msg: "Password Did not match", isAdded: false });
  }
  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 char", isAdded: false });
  }
  //check if there error
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //check if user exist
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User Exist
        errors.push({ msg: "Email Already Exists", isAdded: false });
        res.json(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //Hash password
        bcrypt.genSalt(10, (err, slat) => {
          bcrypt.hash(newUser.password, slat, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //Save to MOngoDB
            newUser.save().then((user) => {
              // set session message
              errors.push({ msg: "Account Created", isAdded: true });
              errors.push({ user });
              res.json(errors);
              res.status(200);
              //res.redirect("/userS/login");
            });
          });
        });
      }
    });
  }
});

// Login Handler
routerapi.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.json(info);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user._id }, "mohammed", { expiresIn: 3600 });
      res.cookie('token', token, { httpOnly: true }).status(200).json({
        token,
        user,
      });
    });
  })(req, res, next);
});

// LogOut Handler
routerapi.get("/logout", (req, res) => {
  req.logout();
  //req.flash("success_msg", "You Are Logout");
  //res.redirect("/users/login");
});
module.exports = routerapi;
