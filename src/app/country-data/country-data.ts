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
  @Input() country: CountryInfo | null = null;
  @Input() loading = false;
  @Input() error = '';
}
