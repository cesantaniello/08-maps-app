import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  map = signal(<mapboxgl.Map | null>null);


  async ngAfterViewInit(){
    const element = this.divElement()?.nativeElement;
      if (!element) return;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.38, 39.47],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({draggable:false, color:'orange'}).setLngLat([-0.38, 39.47]).addTo(map);

    marker.on('dragend', (event) => {})
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map){}
}

