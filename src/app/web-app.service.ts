import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebAppService {

  constructor(private http:HttpClient) { }

  getUser(path){
   return this.http.get<any>("http://localhost:3000"+"/"+path);
  }

  setCurrentUser(userinfo)
  { 
    return this.http.post("http://localhost:3000/database/api/SaveUser",userinfo);
  }
}
