let express=require('express');
let router=express.Router();
const Employee=require("../../models/employee");
router.route("/SaveEmployee").post(function(req,res){
        let employee=new Employee(req.body);
        console.log(employee);
        employee.save(function(err,data){
        if(err) return res.send(err);
        res.send({data:"record has been inserted!"});
});
});
router.route("/UpdateEmployee").put(function(req,res){
    Employee.findByIdAndUpdate(req.body._id,{name:req.body.name,address:req.body.address},function(err,data){
        if(err) return res.send(err);
        res.send({data:"record has been Updated!"});
    });
});

router.route("/deleteEmployee/:id").delete(function(req,res){
   Employee.findByIdAndRemove(req.params.id,function(err){
        if(err) return res.send(err);
        res.send({data:"record has been Deleted!"});
    });
})
router.route("/getEmployee").get(function(req,res){
     const userid=req.query.id;
     Employee.find({id:userid},function(error,data){
        if(error) return res.send(error);
        res.send({data:data});
    })
});
router.route("/getAllEmployee").get(function(req,res){
      Employee.find({},function(error,data){
       if(error) return res.send(error);
       res.send({data:data});
   })
});

module.exports=router;
