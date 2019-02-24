import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, debounceTime, filter } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-index-search',
  templateUrl: './index-search.component.html',
  styleUrls: ['./index-search.component.scss']
})
export class IndexSearchComponent implements OnInit, OnDestroy {

  indexControl: FormControl;
  indexList: string[] = [];
  infoBloclVs: boolean = false;
  placeInfo: string;
  subsc: any;
 
  @Output() setCoordinates: EventEmitter<string[]> = new EventEmitter;
 

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.indexControl = new FormControl();
    this.indexControl.valueChanges.pipe(
      debounceTime(500),
      filter(index => index != ''),
      switchMap(index => this.http.autocompleteIndex(index))
    ).subscribe(({result}) => {
      this.infoBloclVs = false;
      this.indexList = result;
    },
      (err) => console.log(err),
      () => console.log('Complite')
    );
  }

  ngOnDestroy() {
    if(this.subsc) this.subsc.unsubscribe();    
  }

  getCoordinates(index: string) {
    let coord: string[] = [];
    this.subsc = this.http.getIndexInfo(index).pipe(
      map(({result}) => result)
    )
    .subscribe(({latitude, longitude, admin_district}) => {
        coord.push(latitude);
        coord.push(longitude);
        this.indexList = [];
        this.infoBloclVs = true;
        this.placeInfo = admin_district;
        this.setCoordinates.emit(coord);
    })
  }
}
