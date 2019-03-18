let express=require('express')
let path=require('path');
let router=express.Router();
let bodyParser=require('body-parser');
let mongo=require('mongoose');

const Schema=mongo.Schema;


let EmployeesSchema=new Schema({
    id:{type:String},
    name:{type:String},
    address:{type:String},
   
}, {verionKey:false});

// router.get("/api/getUser",function(req,res){
// //     let usermodel=new UserModel(req.body);
// //     console.log(req.body)
// //     console.log(req.body.email);
// // //     usermodel.findOne({email:req.body.email},function(err,res){
// //     if(err) return console.log(error);
// //     console.log(res);

// //    })
//          console.log(req.query.id)
//        UserModel.find({_id:req.query.id},function(err,data){
//        if(err) return res.send(err);
//        console.log(data);
//        res.send({userDetail:data});
//        });
   
// });



let EmployeeModel=mongo.model('employees',EmployeesSchema,'employees');
router.post("/api/SaveEmployee",function(req,res){
    let employeemodel=new EmployeeModel(req.body);
    employeemodel.save(function(err,data){
        if(err) return res.send(err);
        res.send({data:"record has been inserted!"});
    });
});


router.post("/api/UpdateEmployee",function(req,res){
    EmployeeModel.findByIdAndUpdate(req.body._id,{name:req.body.name,address:req.body.address},function(err,data){
        if(err) return res.send(err);
        res.send({data:"record has been Updated!"});
    });
});



router.post("/api/deleteEmployee",function(req,res){
   
    EmployeeModel.deleteOne({_id:req.body.id},function(err){
        if(err) return res.send(err);
        res.send({data:"record has been Deleted!"});
    });
});


router.get("/api/getEmployee",function(req,res){
     const userid=req.query.id;
     EmployeeModel.find({id:userid},function(error,data){
        if(error) return res.send(error);
        console.log(data);
        res.send({data:data});
    })
});




module.exports=router;
