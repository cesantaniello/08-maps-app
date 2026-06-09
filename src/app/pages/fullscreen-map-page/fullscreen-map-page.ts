import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: 100vh;
    }
  `,
})
export class FullscreenMapPage implements AfterViewInit {
  readonly divElement = viewChild<ElementRef>('map');
  private map?: mapboxgl.Map;

  ngAfterViewInit() {
    const element = this.divElement()?.nativeElement;
    if (!element) return;

    this.map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
  }
}
