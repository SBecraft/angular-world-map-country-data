// Import Angular's routing tools
import { Routes } from '@angular/router';
// Import the component that will be shown for the "home" page
import { HomepageComponent } from './homepage/homepage';

// Define all routes for the application
export const routes: Routes = [
  {
    // When the URL is empty
    path: '',
    // Automatically redirect the user to /home
    redirectTo: 'home',
    // Only redirect if the entire URL is empty
    pathMatch: 'full'
  },
  {

    // When the user goes to /home
    path: 'home',
    // Show the HomepageComponent on the screen
    component: HomepageComponent
  }
];

