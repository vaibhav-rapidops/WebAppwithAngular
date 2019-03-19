const express=require('express');
const {google} = require('googleapis');
const app=express();
var session = require('express-session');
const cors=require('cors');
let bodyParser=require('body-parser');
let cookieParser=require('cookie-parser');

const googleapiRoute=require('./routes/login/googleapi');
const facebookapiRoute=require('./routes/login/facebookapi');
const useraccountRoute=require('./routes/employee/employeeAPI');
let mongoose=require('mongoose');


let db=mongoose.connect("mongodb://localhost:27017/WebAppwithAngular",{useNewUrlParser: true},function(error, response){
           if(error) return console.log(error);
           console.log("connected to databse" +db);
});
app.use(cookieParser());
app.use(session({secret: 'uitisawesome'}));
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
const corsOption={
  origin:['http://localhost:4200'],
  methods:['GET','POST','PUT','DELETE']
}
app.use(cors());
require('./routes')(app);

// app.use('/google',googleapiRoute);
// app.use('/database',useraccountRoute);
// app.use('/facebook',facebookapiRoute);


module.exports=app;