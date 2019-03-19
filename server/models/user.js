var mongoose = require('mongoose');
//let Schema=new mongoose.Schema;

let UserSchema=new mongoose.Schema({
    email:{type:String},
    displayName:{type:String},
    image:{type:String},
    currentstatus:{type:Boolean},
  });
 
 const User=mongoose.model('User',UserSchema);

 module.exports=User;
