import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage';
import { CountryData } from './country-data/country-data';
import { WorldMap } from './world-map/world-map';

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


