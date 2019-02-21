import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, debounceTime, mergeMap, filter } from 'rxjs/operators';

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
      mergeMap(index => this.http.autocompleteIndex(index))
    ).subscribe(resp => {
      this.infoBloclVs = false;
      this.indexList = resp['result'];
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
      map(index => index['result'])
    )
    .subscribe(resp => {
        coord.push(resp['latitude']);
        coord.push(resp['longitude']);
        this.indexList = [];
        this.infoBloclVs = true;
        console.log(resp);
        this.placeInfo = resp['admin_district'];
        this.setCoordinates.emit(coord);
    })
  }



}
