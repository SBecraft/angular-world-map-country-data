import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  }
];

