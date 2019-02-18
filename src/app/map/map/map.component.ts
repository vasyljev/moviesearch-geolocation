import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  ngOnInit() {
  }

}
