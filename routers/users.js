const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport =require('passport');
//User Modle
const User = require("../moduls/User");
 
//login router
router.get ('/login',(req,res)=>res.render('login'))
//register  router
router.get ('/register',(req,res)=>res.render('register'))
//Search And Find 
//login router
router.get ('/search',(req,res)=>res.render('search'))
// User Register Save data into db 
//Register Handle
router.post("/register", (req, res) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    //res.send(JSON.stringify(req.body));
    const { name, email, password, repassword} = req.body;
    let errors = [];
    if (!name || !email || !password || !repassword) {
      errors.push({ msg: "Please Provide all Data" });
    }
  
    //check Password match
    if (password !== repassword) {
      errors.push({ msg: "Password Did not match" });
    }
    //check pass length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 char" });
    }
    //check if there error
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password, repassword });
    } else {
      //check if user exist
      User.findOne({ email: email }).then((user) => {
        if (user) {
          //User Exist
          errors.push({ msg: "Email Already Exists" });
          res.render("register", { errors, name, email, password, repassword });
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
                req.flash('success_msg',"Your Account Created!....")
                res.redirect("/userS/login");
              });
            });
          });
        }
      });
    }
  });

// Login Handler
router.post('/login', (req, res,next) => {
    passport.authenticate('local',{
      successRedirect:'/dashboard',
      failureRedirect:'/users/login',
      failureFlash:true,
    })(req,res,next);
    })
    
    // LogOut Handler 
    router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You Are Logout');
    res.redirect('/users/login');
    
    })

module.exports = router;