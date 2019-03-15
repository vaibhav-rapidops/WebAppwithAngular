let express=require('express')
let path=require('path');
let router=express.Router();
let bodyParser=require('body-parser');
let mongo=require('mongoose');

let db=mongo.connect("mongodb://localhost:27017/WebAppwithAngular",{useNewUrlParser: true},function(error, response){
           if(error) return console.log(error);
           console.log("connected to databse");
});

let Schema=mongo.Schema;
let UsersSchema=new Schema({
      email:{type:String},
    displayName:{type:String},
    image:{type:String}
},{verionKey:false});

let model=mongo.model('users',UsersSchema,'users');

router.post("/api/SaveUser",function(req,res){
    let mod=new model(req.body);
    console.log(req.body)

    mod.save(function(err,data){
        if(err) return res.send(err);
        res.send({data:"record has been inserted!"});
    });
});



module.exports=router;
