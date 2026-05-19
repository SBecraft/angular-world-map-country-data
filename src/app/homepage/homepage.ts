import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CountryInfo } from '../models/country-info.model';
import { WorldBankApiService } from '../services/world-bank-api.service';
import { WorldMap } from '../world-map/world-map';
import { CountryData } from '../country-data/country-data';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [WorldMap, CountryData],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class HomepageComponent {
  private countryService = inject(WorldBankApiService);
  private cdr = inject(ChangeDetectorRef);

  selectedCountry: CountryInfo | null = null;
  loading = false;
  error = '';

  //The loadCountry() method triggers the world-bank-api service when a country
  //is selected and sets a type of data variable for display

  loadCountry(code: string): void {
    this.loading = true;
    this.error = '';
    this.selectedCountry = null;

    this.countryService.getCountryData(code).subscribe({
      next: (data) => {
        this.selectedCountry = data;
        this.loading = false;
        this.cdr.detectChanges(); // tells Angular to update the view
      },
      error: () => {
        this.error = 'Could not load country data. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
