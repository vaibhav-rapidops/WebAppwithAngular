import { Component, OnInit } from '@angular/core';
import { WebAppService } from 'src/app/web-app.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData:any;
  user:any;
  check:Boolean;
  constructor(private webAppService:WebAppService) { }
  ngOnInit() {
    this.userInfo();
  }
  userInfo(){
    const path="google/userData"
    this.webAppService.getUser(path).subscribe(
      res=>{
        console.log(res)
        this.userData=res.userDetail;
        if(this.userData){
        this.user=new User(this.userData[1].email,this.userData[1].displayName,this.userData[1].image)
     //   this.saveUser(this.user);
        this.check=true;
        console.log(this.user)}
        error=>{console.log(error)};
      }
    )

  }

  saveUser(data){
    this.webAppService.setCurrentUser(data).subscribe();
  }

}
