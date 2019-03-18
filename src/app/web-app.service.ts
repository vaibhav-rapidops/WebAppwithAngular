import { Injectable ,HostListener, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserIdleService } from 'angular-user-idle';
import { Subject} from 'rxjs/Subject';
import { HomeComponent } from './components/home/home.component';
@Injectable({
  providedIn: 'root'
})


export class WebAppService {


  private componentMethodCallSource = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }



  constructor(private userIdle: UserIdleService,private http:HttpClient) {
         this.userIdle.onTimerStart().subscribe(count => console.log(count))
         this.userIdle.onTimeout().subscribe(() => {  
          this.callComponentMethod();
         console.log('Time is up!')
      })
    }

  url="http://localhost:3000";
  
  createUser(path){
    return this.http.get<any>(this.url+"/"+path);

  }
  
  getUser(id){
    console.log(id);
     return this.http.get<any>(this.url+"/google/userData?id="+id);
  }

  setUser(id){
    console.log(id);
     return this.http.get<any>(this.url+"/google/logout?id="+id);
  }

  getStatus(id){
    console.log(id);
     return this.http.get<any>(this.url+"/google/status?id="+id);
  }

  setCurrentUser(userinfo)
  { 
    return this.http.post(this.url+"/database/api/SaveUser",userinfo);
  }


get(id){
  return this.http.get<any>(this.url+'/database/api/getEmployee?id='+id);
}

post(data){
  return this.http.post(this.url+'/database/api/SaveEmployee',data);
}

update(data){
  return this.http.post(this.url+'/database/api/UpdateEmployee',data);
}


delete(id){
  return this.http.post(this.url+'/database/api/deleteEmployee',id);
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
