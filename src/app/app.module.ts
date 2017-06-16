import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview.component';
import { MapToIterable } from './app.pipe';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';
import { routing } from './app.routing';
import { EnvEditComponent } from './envEdit.component';
import { NavBarComponent } from './navBar.component';
import { DatePickertDirective } from './datePicker.directive'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    routing,
  ],
  declarations: [
    AppComponent,
    PreviewComponent,
    EnvEditComponent,
    NavBarComponent,
    MapToIterable,
    DatePickertDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule  { 
  
}
