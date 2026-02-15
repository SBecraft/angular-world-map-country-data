import { Component, input } from '@angular/core';

@Component({
  selector: 'app-country-data',
  imports: [],
  templateUrl: './country-data.html',
  styleUrl: './country-data.css',
})
export class CountryData {
  @Input() country: any;
}
