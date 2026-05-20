import { Component, Input } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { CountryInfo } from '../models/country-info.model';

@Component({
  selector: 'app-country-data',
  standalone: true,
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './country-data.html',
  styleUrl: './country-data.css'
})
export class CountryData {
  @Input() country: CountryInfo | null = null;  // Passes model (class) country-info describing a country  
  @Input() loading = false;  // Lets homepage parent component tell whether data is still loading
  @Input() error = '';    // Allows homepage parent component pass an error message if something went wrong loading country information
}
