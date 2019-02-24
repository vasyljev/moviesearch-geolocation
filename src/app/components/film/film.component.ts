import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, debounceTime, tap, switchMap, flatMap, filter } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Movie } from '../../models/movie';
import { from } from 'rxjs';



@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, OnDestroy {

  filmSearchControl: FormControl;
  searchResult: Movie[] = [];
  searchError: string;
  visabilityFilmDescription: boolean = false;
  subscribtion: any;
  

  constructor(private http: HttpService,
              private LS: LocalStorageService) { }

  ngOnInit() {   
    this.filmSearchControl = new FormControl();    
    this.subscribtion = this.filmSearchControl.valueChanges.pipe(      
      debounceTime(700),      
      map(item => {        
        if(item.search(' ') != -1) {
          let tmpItemArr = item.split(' ');
          let tmpItemString = tmpItemArr.join('+');
          return tmpItemString;
        } else {
          return item;
        }        
      }),
      switchMap(value => {
        this.searchResult = [];
        return this.http.getMoviesList(value);
      }),
      filter(resp => !resp['Error']),      
      switchMap(({Search}) => {
        return from(Search);
      }),
      flatMap((movie: Movie) => {
        return this.http.getMovie(movie.Title)
      })    
    ).subscribe(   
      (val: Movie) => {
      this.searchResult.push(val);  
      this.visabilityFilmDescription = true;
      this.searchError = '';
      },
      (err) => console.log(err),
      () => console.log('Complite')
    );
  }
    
  clear() {
    this.LS.claer();
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  
}
