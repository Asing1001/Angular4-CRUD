import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview.component';
import { MapToIterable } from './app.pipe';
import { HttpModule }    from '@angular/http';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule
  ],
  declarations: [
    AppComponent,
    PreviewComponent,
    MapToIterable
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
