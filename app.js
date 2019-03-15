const express=require('express');
const {google} = require('googleapis');
const app=express();
const cors=require('cors');
let bodyParser=require('body-parser');
const googleapiRoute=require('./routes/googleapi');
const facebookapiRoute=require('./routes/facebookapi');
const useraccountRoute=require('./routes/useraccount');


app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
const corsOption={
  origin:['http://localhost:4200']
}
app.use(cors(corsOption));
app.use('/google',googleapiRoute);
app.use('/database',useraccountRoute);
app.use('/facebook',facebookapiRoute);


module.exports=app;