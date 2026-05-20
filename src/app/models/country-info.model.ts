// Create interface (object class CountryInfo) representing all data fields for a country
export interface CountryInfo {
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  population: number | null;
  gdpPerCapita: number | null;
}
