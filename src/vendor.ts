// webpack will compute dependency so it will reduce app.js size 
// Vendor file seldom change, group in one js client could only download once 

// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'rxjs';

//ng2 3rd party
import 'angular2-toaster';

//external 3rd party
import 'moment';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';
import './vendors/bootstrap-material-datetimepicker'

//css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import 'angular2-toaster/lib/toaster.css';
import './vendors/bootstrap-material-datetimepicker/styles.css'
import './styles.css';
