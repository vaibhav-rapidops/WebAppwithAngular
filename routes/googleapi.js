const {google} = require('googleapis');
const express=require('express');
const router=express.Router();
let mongo=require('mongoose');
const localstorage= require('local-storage');
const Schema=mongo.Schema;
let UsersSchema=new Schema({
  email:{type:String},
  displayName:{type:String},
  image:{type:String}
},{verionKey:false});
let UserModel=mongo.model('users',UsersSchema,'users');


const config={
  CLIENT_ID:"161830841145-citdi0a9ne9pe14il7rsa8q9ka8q2d9p.apps.googleusercontent.com",
  CLIENT_SECRET:"xLVfkxcY8SoRkhUxMuDVhD7R",
  REDIRECT_URL:"http://localhost:3000/google/userinfo"}


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

function checkCredential(){
oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
  });
}

router.get('/',(req,res,next)=>{
  res.status(200).send({url:url});
  // res.redirect(url);
});



router.get('/userinfo',async (req,res,next)=>{
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
           }
           UserModel.findOne({email:user.email},function(err,data){   
           if(err) return console.log(error);
           const id=data._id
           if(!data){
                let usermodel=new UserModel(user); 
                       usermodel.save(function(err,r){
                    if(err) return res.send(err);
                    if(err) return res.send(err);
                    console.log("record has been inserted!");
                     });
                  }else{
            console.log("record already inserted!");
              }
  
    res.status(200).redirect('http://localhost:4200/home?id='+id);
   });
});
   }

  catch(error){
  console.log(error);}

});

router.get('/userData',(req,res,next)=>{
             console.log(req.query.id);

             UserModel.findOne({_id:req.query.id},function(err,data){
             if(err) return res.send(err);
             console.log(data);
             res.send({userDetail:data});
             });
         
  });

  


// router.get('/userData',(req,res,next)=>{
//  	 const tokens=localstorage.get("access_token");
//      oauth2Client.setCredentials(tokens);
//      let userDetail=[];
     
//        const service = google.people({version: 'v1', auth:oauth2Client});
//        service.people.connections.list({resourceName: 'people/me',personFields:'names,phoneNumbers'},(error,result)=>{
//        if(error) return console.log(error);
//        let userData=result.data.connections;
//        if(userData){
//          	userData.forEach(people=>{
//        		    if((people.names && people.names.length>0) && (people.phoneNumbers && people.phoneNumbers.length>0)){

//                 userDetail.push({
//                 	personName:people.names[0].displayName,
//                     contectNo: people.phoneNumbers[0].value
//                    })  
//                }});
//         }
      
//           res.send({userDetail:userDetail});


//      });
// });

module.exports=router;
