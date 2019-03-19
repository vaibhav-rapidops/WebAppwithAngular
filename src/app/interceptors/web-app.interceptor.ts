import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { WebAppService } from '../web-app.service';

@Injectable()
export class WebAppInterceptor implements HttpInterceptor {
  constructor(private webAppService:WebAppService) { }  
 intercept(
     request: HttpRequest<any>,
     next: HttpHandler
      ): Observable<HttpEvent<any>> {
     console.log("restert");
     
     this.webAppService.restart();
     return next.handle(request).pipe(
      tap(
        event => {
        
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    )
  
  }
  }

