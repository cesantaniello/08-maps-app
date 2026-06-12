import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `
})
export class MiniMap implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  ngAfterViewInit() {
    const element = this.divElement()?.nativeElement;
    if (!element) return;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
    }
  );

  new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
}}
