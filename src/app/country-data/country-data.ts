import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { CountryInfo } from '../services/country.service';

@Component({
  selector: 'app-country-data',
  standalone: true,
  imports: [CommonModule, DecimalPipe, CurrencyPipe],
  templateUrl: './country-data.html',
  styleUrl: './country-data.css'
})
export class CountryData {
  @Input() country: CountryInfo | null = null;
  @Input() loading = false;
  @Input() error = '';
}