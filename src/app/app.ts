import { Component, signal } from '@angular/core';
import { } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('World Map-Country Data');
}
