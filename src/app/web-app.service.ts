import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebAppService {

  constructor(private http:HttpClient) { }

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

}
