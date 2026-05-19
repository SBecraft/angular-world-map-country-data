import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryInfo } from '../models/country-info.model';

@Injectable({ providedIn: 'root' })

// World Bank API service — uses HttpClient to make 3 separate API calls to the World Bank API
// using a 2-letter country code to retrieve the country name, capital city, region, 
// income level, population, and GDP per capita for the selected country

export class WorldBankApiService {
  private http = inject(HttpClient);
  private BASE = 'https://api.worldbank.org/v2';

  getCountryData(code: string): Observable<CountryInfo> {

    // Create and return a new Observable 
    return new Observable(observer => {

      // We need to wait for all 3 API calls to finish before emitting the result.
      // This counter tracks how many calls have completed.
      let completedCalls = 0;

      const result: CountryInfo = {
        name: '', capitalCity: '', region: '', incomeLevel: '',
        population: null, gdpPerCapita: null
      };

      // Each time a call finishes, the counter increments.
      // The counter ensures all 3 calls complete before the data is sent to 
      // the homepage for display. Display the result with observer.next().
      const checkIfDone = () => {
        completedCalls++;
        if (completedCalls === 3) {
          observer.next(result);
          observer.complete();
        }
      };

      // Call 1: basic country info (name, capital, region, income level)
      this.http.get<any[]>(`${this.BASE}/country/${code}?format=json`).subscribe({
        next: (infoRes) => {
          const c = infoRes[1]?.[0] ?? {};
          result.name         = c.name               ?? 'Unknown';
          result.capitalCity  = c.capitalCity        ?? 'N/A';
          result.region       = c.region?.value      ?? 'N/A';
          result.incomeLevel  = c.incomeLevel?.value ?? 'N/A';
          checkIfDone();
        },
        error: (err) => observer.error(err)
      });

      // Call 2: population
      this.http.get<any[]>(`${this.BASE}/country/${code}/indicator/SP.POP.TOTL?format=json&mrv=1`).subscribe({
        next: (popRes) => {
          result.population = popRes?.[1]?.[0]?.value ?? null;
          checkIfDone();
        },
        error: () => checkIfDone()   // not all countries have population data — that's ok
      });

      // Call 3: GDP per capita
      this.http.get<any[]>(`${this.BASE}/country/${code}/indicator/NY.GDP.PCAP.CD?format=json&mrv=1`).subscribe({
        next: (gdpRes) => {
          result.gdpPerCapita = gdpRes?.[1]?.[0]?.value ?? null;
          checkIfDone();
        },
        error: () => checkIfDone()   
      });

    });
  }
}

