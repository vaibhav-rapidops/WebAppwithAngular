var mongoose = require('mongoose');
let EmployeeSchema=new mongoose.Schema({
    id:{type:String},
    name:{type:String},
    address:{type:String},  
});
const Employee=mongoose.model('Employee',EmployeeSchema,'Employee');
module.exports=Employee;
