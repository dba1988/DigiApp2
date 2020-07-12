const express = require("express");
const router = express.Router();

// load User MOdule 
const User = require('../moduls/User');
const {ensureAuthenticated} = require('../config/checklogin')

router.get ('/',(req,res)=>res.render('welcome'))

router.get('/dashboard',ensureAuthenticated,(req,res)=>{res.render('dashboard', {
    user: req.user,
    
  })});
module.exports = router;