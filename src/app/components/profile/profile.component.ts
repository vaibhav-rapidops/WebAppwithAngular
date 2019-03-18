import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any
  check=false;
  currentuser:any;
  id:any
  constructor(private homeComponent:HomeComponent,private router:Router) {
    this.currentuser=sessionStorage.getItem("email");
    this.id=this.currentuser;
    if(!this.currentuser){
         this.router.navigate(['/login']);
    }
   }
  ngOnInit() {
  this.user=this.homeComponent.user
  if(this.user){
    this.check=true
  }
 
}
}
