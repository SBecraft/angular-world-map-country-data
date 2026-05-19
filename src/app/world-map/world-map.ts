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
    this.http.get(`/map-image.svg?t=${Date.now()}`, { responseType: 'text' }).subscribe({
      next: (svg) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        this.mapLoading = false;
        this.cdr.detectChanges(); // tells Angular to update the view
      },
      error: () => {
        this.svgContent = '<p style="color:red">Map failed to load.</p>';
        this.mapLoading = false;
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

  onMapHover(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const name = target?.getAttribute('name');
    if (name) {
      this.hoveredCountry = name;
    }
  }

  onMapLeave(): void { }
}
