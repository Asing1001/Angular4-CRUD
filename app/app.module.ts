import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview.component';
import { MapToIterable } from './app.pipe';
import { HttpModule }    from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    PreviewComponent,
    MapToIterable
  ],
  //providers:[HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
