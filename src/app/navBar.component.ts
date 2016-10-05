import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-bar',
    templateUrl: 'navBar.html'
})
export class NavBarComponent implements OnInit {
    dateRange;
    constructor() {
        this.dateRange = {};    
    }

    ngOnInit() { }

    search({from,to}){
        debugger;
    }    
}