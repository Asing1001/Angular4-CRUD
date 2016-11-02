import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './main.css';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);