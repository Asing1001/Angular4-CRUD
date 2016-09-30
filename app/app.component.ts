import { Component, AfterViewChecked } from '@angular/core';
declare var $;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
     <nav-bar></nav-bar>     
    `
})
export class AppComponent implements AfterViewChecked{
  ngAfterViewChecked(){
    $.material.init();  
  }
}
