import { Component,OnInit, TemplateRef } from '@angular/core';

import { WebAppService } from 'src/app/web-app.service';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  modalRef: BsModalRef;
  user:User=new User();
  editUser:any;
  users:any;
  deleteId={'id':''};
  errorMsg: ErrorMsg=new ErrorMsg();
  currentuser:any;
  id:any;
  constructor(private modalService: BsModalService,private webAppService :WebAppService,private router:Router) {
    this.currentuser=sessionStorage.getItem("email");
    this.id=this.currentuser;
    if(!this.currentuser){
         this.router.navigate(['/login']);
    }
  }
 
  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  openModalEdit(template: TemplateRef<any>,user) {
    this.modalRef = this.modalService.show(template);
    this.editUser=user;
  }

  openModalDelete(template: TemplateRef<any>,id) {
    this.deleteId.id=id;
    this.modalRef = this.modalService.show(template);
  
  }
  ngOnInit() {
    this.getEmployee(this.id);
  }

  getEmployee(id){
  this.webAppService.get(id).subscribe(
    res=>{
       this.users=res.data;
       console.log(this.users);    
  },error=>{
    console.log(error);
  }
  ) 
  }

  onSave(){
       this.errorMsg.name=this.errorMsg.address='';
       !this.user.name?this.errorMsg.name="Name required" :'';
       !this.user.address?this.errorMsg.address="Address required" :'';
       if(!this.user.name||!this.user.address){
         return;
       }

        this.user.id=this.currentuser;
        this.webAppService.post(this.user).subscribe(res=>{
         this.getEmployee(this.user.id);
         this.modalRef.hide();
         console.log(res);
       },error=>{
         console.log(error);
       }
       )
  }
  onUpdate(){
    this.webAppService.update(this.editUser).subscribe(
      res=>{
      this.getEmployee(this.id);
      this.modalRef.hide();
      },error=>{
        console.log(error);
      })

  }


  onDelete(){
      this.webAppService.delete(this.deleteId).subscribe(
        res=>{
        this.getEmployee(this.id);
        this.modalRef.hide();
        },error=>{
          console.log(error);
        })
  
    
  }

}

class User{
  id:String;
  name:String;
  address:String;
}

class ErrorMsg{
  name:String;
  address:String;
}