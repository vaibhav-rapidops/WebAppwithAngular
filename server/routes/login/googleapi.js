
const User=require('../../models/user');
const {google} = require('googleapis');
const express=require('express');
const router=express.Router();
let mongo=require('mongoose');
const localstorage= require('local-storage');

const config={
  CLIENT_ID:"",
  CLIENT_SECRET:"",
  REDIRECT_URL:""}
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.profile',
    ];

const oauth2Client = new google.auth.OAuth2(config.CLIENT_ID,config.CLIENT_SECRET,config.REDIRECT_URL);
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt:"consent"
});
router.get('/',(req,res,next)=>{
  res.status(200).send({url:url});
});
router.get('/userInfo',async (req,res,next)=>{
	const code=req.query.code;
	try{
      const {tokens} = await oauth2Client.getToken(code);
       oauth2Client.setCredentials(tokens);
       localstorage.set("token",tokens);
       const plus=google.plus({version: 'v1', auth:oauth2Client});

       plus.people.get({userId: 'me',personFields:'displayName'}, (err, result) => {
       if (err) return console.log('The API returned an error: ' + err); 
            const user={
            email:result.data.emails[0].value,
            displayName:result.data.displayName,
            image:result.data.image.url,
            currentstatus:true,
            }
           User.findOneAndUpdate({email:user.email},{ $set:{currentstatus:true}},function(err,data){   
           if(err) return console.log(err);
           if(!data){

                const usermodel=new User(user); 
                    usermodel.save(function(err,res){
                    if(err) return res.send(err);
                    const  id=res._id;
                    console.log("record has been inserted!");
                    res.status(200).redirect('http://localhost:4200/home?id='+id);
                     });
                  }else{
                   const id=data._id;
                    console.log("record already inserted!");
                   res.status(200).redirect('http://localhost:4200/home?id='+id);
                  }
   });
});
   }catch(error){
  console.log(error);}

});
router.get('/userData',(req,res,next)=>{
             User.findOne({_id:req.query.id},function(err,data){
             if(err) return res.send(err);
             res.send({userDetail:data});
             });
});
router.get('/logout',(req,res,next)=>{
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        User.findByIdAndUpdate(req.query.id,{$set:{currentstatus:'false'}},function(err,data){   
        if(err) return console.log(err);
        data.currentstatus=false;
       res.send({data:data});
      })
    
      }
    });
    
});
router.get("/status",function(req,res){
  const userid=req.query.id;
  console.log(userid);
  User.findOne({_id:userid},function(error,data){
     if(error) return res.send(error);

     res.send({data:data});
 })
});

module.exports=router;
