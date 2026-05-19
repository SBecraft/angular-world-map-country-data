import { Component } from '@angular/core';
import { HomepageComponent } from './homepage/homepage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomepageComponent],
  template: '<app-homepage></app-homepage>'
})
export class App {}

