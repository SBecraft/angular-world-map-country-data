import { Component } from '@angular/core';

getCountryData(code: string) {
  return this.http.get(
    `${this.baseUrl}/country/${code}?format=json`
  );
}


@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.html',
  styleUrl: './world-map.css',
})
export class WorldMap {

}
