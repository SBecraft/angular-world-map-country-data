import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CountryInfo {
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  population: number | null;
  gdpPerCapita: number | null;
}

@Injectable({ providedIn: 'root' })
export class WorldBankApi {
  private http = inject(HttpClient);
  private BASE = 'https://api.worldbank.org/v2';  
}

/**
   * Accepts a two-letter ISO country code and returns
   * combined country info from the World Bank API.
   */

