import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  map = signal(<mapboxgl.Map | null>null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit(){
    const element = this.divElement()?.nativeElement;
      if (!element) return;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.38, 39.47],
      zoom: 14,
    });
/*
    const marker = new mapboxgl.Marker({draggable:false, color:'orange'}).setLngLat([-0.38, 39.47]).addTo(map);

    marker.on('dragend', (event) => {})
*/
    this.mapListeners(map);
  }
  mapListeners(map: mapboxgl.Map){
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){
    if(!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random()*16) | 0).toString(16));

    const mapboxMarker = new mapboxgl.Marker({color:color}).setLngLat(coords).addTo(map);

    const newMarker: Marker = {id: UUIDv4(), mapboxMarker: mapboxMarker}

    this.markers.update((markers)=> [newMarker, ...markers])
    console.log(this.markers())
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map()) return;

    this.map()?.flyTo({center: lngLat});
  }
}

