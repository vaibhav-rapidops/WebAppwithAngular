import { Component,HostListener, ViewChild,OnInit
} from '@angular/core';
import { Idle } from 'idlejs/dist';
import { UserIdleService } from 'angular-user-idle';

import { HomeComponent } from './components/home/home.component';
import { WebAppService } from 'src/app/web-app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild (HomeComponent)
  private homeComponent:HomeComponent; 
  constructor(private userIdle:UserIdleService,private webAppService:WebAppService){
    
  }
  @HostListener('click', ['$event']) onClick(event){
    this.webAppService.restart();
    console.log('component is clicked');
    console.log(event);

  }


  title = 'AngularWebApp';

  
  
  


  

}
