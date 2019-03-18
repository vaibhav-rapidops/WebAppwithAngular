import { Component, OnInit } from '@angular/core';
import { WebAppService } from 'src/app/web-app.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute ,Router} from '@angular/router';
@Component({    
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData:any;
  user:any;
  check:Boolean;
  currentuser:any;
  id:any
  constructor(private webAppService:WebAppService,private router:Router,private route:ActivatedRoute) { 
    this.id=this.route.queryParams.id;
    sessionStorage.setItem("email",this.currentuser.id );
    this.currentuser=sessionStorage.getItem("email");
    if(!this.currentuser){
         this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    this.userInfo();
  }
  userInfo(){
    const id="5c8e2514b428af25fcfc3b17";
    this.webAppService.getUser(id).subscribe(
      res=>{
        console.log(res.userDetail)
        this.userData=res.userDetail;
        if(this.userData){
        this.user=new User(this.userData.email,this.userData.displayName,this.userData.image);
        console.log(this.user.email);
        sessionStorage.setItem("email",this.user.email);
        this.check=true;
        console.log(this.user)}
        error=>{console.log(error)};
      }
    )
  }
  // saveUser(data){
  //         this.webAppService.setCurrentUser(data).subscribe();
  // }
}
// userInfo(){
//     const path="google/userData"
//     this.webAppService.getUser(path).subscribe(
//       res=>{
//         console.log(res)
//         this.userData=res.userDetail;
//         if(this.userData){
//         this.user=new User(this.userData[1].email,this.userData[1].displayName,this.userData[1].image)
//         //this.saveUser(this.user);
//         sessionStorage.setItem("email",this.user.email);
//         this.check=true;
//         console.log(this.user)}
//         error=>{console.log(error)};
//       }
//     )
//   }