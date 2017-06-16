import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
     <nav-bar></nav-bar>    
     <router-outlet></router-outlet> 
    `
})
export class AppComponent implements AfterViewChecked{
  ngAfterViewChecked(){
    $.material.init();  
  }
}
