import { Component, OnInit } from '@angular/core';
import { WebAppService } from 'src/app/web-app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private webAppService:WebAppService) { } 

  ngOnInit() {
  }

  
 onGoogleAPI(){
  const path="login"
  this.webAppService.createUser(path).subscribe(
       (res:any)=>{
        window.location.href=res.url; 
      },
        error=>{ console.log(error);}
        )
 
   }
 
   onFaceBookAPI(){
     const path="facebook";
    this.webAppService.createUser(path).subscribe(
     (res:any)=>{
     console.log(res.url);
     window.location.href=res.url;
    
   },
    error=>{ console.log(error);}
  )
 
 }
     
}
