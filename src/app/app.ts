import { Component, signal } from '@angular/core';
import { HomeComponent } from "./homepage/homepage";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('apptwo');
}
