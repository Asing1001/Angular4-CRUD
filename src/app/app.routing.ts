import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvEditComponent }      from './envEdit.component';

const appRoutes: Routes = [
  {
    path: 'envedit/:project',
    component: EnvEditComponent
  },
  {
    path: '',
    redirectTo: '/envedit/188',
    pathMatch :'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);