import { Component, inject } from '@angular/core';
import { CountryInfo } from '../services/world-bank-api.service';
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
  private countryService = inject(CountryService);

  selectedCountry: CountryInfo | null = null;
  loading = false;
  error = '';

  /**
   * Triggered by the WorldMap (countrySelected) output.
   * Calls the service and stores the result for display.
   */
  loadCountry(code: string): void {
    this.loading = true;
    this.error = '';
    this.selectedCountry = null;

    this.countryService.getCountryData(code).subscribe({
      next: (data) => {
        this.selectedCountry = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load country data. Please try again.';
        this.loading = false;
      }
    });
  }
}

