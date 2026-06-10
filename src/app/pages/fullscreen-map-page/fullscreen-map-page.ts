import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: 100vh;
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      border: 1px solid #ccc;
      width: 250px;
    }
  `,
})
export class FullscreenMapPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal(<mapboxgl.Map | null>(null));

  zoom = signal(14);
  city = signal([-0.38, 39.47]);

  zoomEffect = effect(() => {
    if(!this.map()) return;
    this.map()?.setZoom(this.zoom());
  })

  ngAfterViewInit() {
    const element = this.divElement()?.nativeElement;
    if (!element) return;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.city()[0], this.city()[1]],
      zoom: this.zoom(),
    });
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map){
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })
    this.map.set(map);
  }
}
