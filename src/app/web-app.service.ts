import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UserIdleService } from 'angular-user-idle';
import { Subject} from 'rxjs/Subject';
import { ActivatedRoute ,Router} from '@angular/router';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class WebAppService{
  // private homeComponent = new Subject<any>();
  // homeComponent$ = this.homeComponent.asObservable();
  // autoLogout(){
  //  this.homeComponent.next();}

  constructor(private userIdle: UserIdleService,private http:HttpClient,private router:Router) {
         this.userIdle.onTimerStart().subscribe(count => console.log(count))
         this.userIdle.onTimeout().subscribe(() => { 
          this.stopWatching();
       
        this.setUser(localStorage.getItem("id")).subscribe(res=>{
          if(!res.data.currentstatus){
            console.log(res.data);
            localStorage.clear();
         this.router.navigate(['/login']);
         }});
         console.log('Time is up!')
      })
    }


  url="http://localhost:3000";
  
  createUser(path){
    return this.http.get<any>(this.url+"/"+path);

  }
  getUser(id){
    console.log(id);
     return this.http.get<any>(this.url+"/login/userData?id="+id);
  }

  setUser(id){
    console.log(id);
     return this.http.get<any>(this.url+"/login/logout?id="+id);
  }

  getStatus(id){
    console.log(id);
     return this.http.get<any>(this.url+"/login/status?id="+id);
  }

  setCurrentUser(userinfo)
  { 
    return this.http.post(this.url+"/employee/SaveUser",userinfo);
  }


get(id){
  return this.http.get<any>(this.url+'/employee/getEmployee?id='+id);
}

post(data){
  console.log(data);
  return this.http.post(this.url+'/employee/SaveEmployee',data);
}

update(data){
  return this.http.put(this.url+'/employee/UpdateEmployee',data);
}

delete(id){
  console.log(id);
  return this.http.delete(this.url+'/employee/deleteEmployee/'+id);
}
 


stop() {
  this.userIdle.stopTimer();
}

stopWatching() {
  this.userIdle.stopWatching();
}

startWatching() {
  this.userIdle.startWatching();
}

restart() {
  this.userIdle.resetTimer();
}
}
