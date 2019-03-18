import { Component, OnInit } from '@angular/core';
import { WebAppService } from 'src/app/web-app.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute ,Router} from '@angular/router';
import { async } from 'q';
@Component({    
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData:any;
  user:any;
  currentuser:any;
  id=null;
  check:any
  currentid:string;
  constructor(private webAppService:WebAppService,private router:Router,private route:ActivatedRoute) { 
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.id = params.id;
      console.log(this.id); 
    });

    if(this.id){
        localStorage.setItem("id",this.id );
        this.id=localStorage.getItem("id");
        console.log(this.id);
        this.checkstatus(this.id);
        //console.log(checkuser);
        // if(!this.check){
        //   this.router.navigate(['/login']);
        // }
   
    }else{
      const currentid=localStorage.getItem("id");
      if(currentid){
          this.id=currentid;
          console.log(currentid);
          console.log(this.id);
          this.checkstatus(this.id);
       
       
      }else{
      this.router.navigate(['/login']);
      }
    }
 

  }
  ngOnInit() {
    this.userInfo();
  }
  userInfo(){
    this.webAppService.getUser(this.id).subscribe(
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


  onLogout(){
   localStorage.removeItem("id");
   this.webAppService.setUser(this.id).subscribe(res=>{
    if(!res.data.currentstatus){
      this.router.navigate(['/login']);
    }
     
   });
   
   
  }

 checkstatus(userid){
  let user;
  this.webAppService.getStatus(userid).subscribe(res=>{ user=res.data.currentstatus
  if(!user){
    this.router.navigate(['/login']);
  }

  });


}

  
}
