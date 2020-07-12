const express =require("express");
const expressLayouts = require('express-ejs-layouts');
const flash =require('connect-flash')

const bodyParser = require("body-parser");
const session = require('express-session')
const passport = require('passport')
var cors = require('cors')
// Get DB
const mongooes = require('mongoose');
//Passport Config 
require('./config/passport')(passport);
//db connection 
const db = require('./config/configdb').MongoURI;
mongooes.connect(db,{useNewUrlParser:true})
.then(()=>console.log('Database Connected................. Started'))
.catch(err=>console.log(err))



const app =express();

//init View Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',"Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
      
    ],
  };
  
  app.use(cors(corsOpts));

// Parse data coming from FORM/body 
app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json());


//express session init 
app.use(session({
    secret:'mohammed',
    resave :true,
    saveUninitialized:true
}))

//Passport Middlwere 
app.use(passport.initialize());
app.use(passport.session());
//connect flash 
app.use(flash());

//Create Global Var by init middleware as function 
app.use((req,res,next)=>{
    // name the like the follow. res.local follow by var name 
 res.locals.success_msg=req.flash('success_msg');
 res.locals.error_msg=req.flash('error_msg');
 res.locals.error=req.flash('error');
 res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
 next(); 

})

// Init Router 
app.use('/',require('./routers/index'));
app.use('/users',require('./routers/users'));
// API Router 
app.use('/api',require('./routers/api'))





const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`))