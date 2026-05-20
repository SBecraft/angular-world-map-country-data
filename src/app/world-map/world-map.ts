import { Component, OnInit, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [],
  templateUrl: './world-map.html',
  styleUrl: './world-map.css'
})
export class WorldMap implements OnInit {

  @Output() countrySelected = new EventEmitter<string>();

  svgContent: SafeHtml = '';
  hoveredCountry = '';
  mapLoading = true;

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Load the SVG map file (adding a timestamp to prevent browser from using a cached version)
    this.http.get(`/map-image.svg?t=${Date.now()}`, { responseType: 'text' }).subscribe({

      // If the map loads successfully:
      next: (svg) => {
        // Store the SVG content and mark it as safe to display
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);

         // Turn off the loading indicator
        this.mapLoading = false;

        // Update the screen so the new map appears
        this.cdr.detectChanges(); // tells Angular to update the view
      },
      
      // If the map fails to load:
      error: () => {
        // Show a simple error message instead of the map
        this.svgContent = '<p style="color:red">Map failed to load.</p>';

        // Turn off the loading indicator
        this.mapLoading = false;

        // Refresh the view to show the error message
        this.cdr.detectChanges();
      }
    });
  }

  //Using event binding to connect the SVG world map to a mouse click event to
  //make the svg map interactive
  onMapClick(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const code = target?.id;
    if (code && code.length === 2) {
      const container = event.currentTarget as HTMLElement;
      container.querySelectorAll('path.active').forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      this.hoveredCountry = target.getAttribute('name') ?? code.toUpperCase();
      this.countrySelected.emit(code.toLowerCase());
    }
  }

  // When the mouse moves over a country on the map
  onMapHover(event: MouseEvent): void {
    // Get the exact SVG element the mouse is currently on
    const target = event.target as SVGPathElement;

    // Read the "name" attribute from that SVG path (each country has one)
    const name = target?.getAttribute('name');

    // If a country name exists, show it in the UI
    if (name) {
      this.hoveredCountry = name;
    }
  }

  // When the mouse leaves the map area (nothing to do yet)
  onMapLeave(): void { }
}
