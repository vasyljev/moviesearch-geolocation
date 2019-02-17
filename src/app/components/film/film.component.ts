import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, debounceTime, switchMap } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Movie } from '../../models/movie';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  filmSearchControl: FormControl;
  searchResult: Movie[] = [];
  searchError: string;
  visabilityFilmDescription: boolean = false;
  

  constructor(private http: HttpService,
              private LS: LocalStorageService) { }

  ngOnInit() {   
    this.filmSearchControl = new FormControl();    
    this.filmSearchControl.valueChanges.pipe(      
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
        console.log('title', value);
        this.searchResult = [];
        return this.http.getMoviesList(value);
      }))
      .subscribe(resp => {
              if(resp['Error']) {
                console.log('Error 111');
                this.visabilityFilmDescription = false;
                this.searchError = resp['Error'];
              } else {
              return from(resp['Search']).pipe(
                flatMap((value: any)  => {          
                      return this.http.getMovie(value.Title);                  
                })
              ).subscribe((val: Movie) => {                          
                if(val['Error']) {
                  this.visabilityFilmDescription = false;
                  this.searchError = val['Error'];
                } else {
                  this.searchResult.push(val);  
                  this.visabilityFilmDescription = true;
                  this.searchError = '';
                }              
              });
              
              }
        },      
                (err) => console.log('Error !!!!', err),
                () => console.log('Complite'));

      }
 
      // .subscribe((val: Movie) => {
      //         if(val['Error']) {
      //           this.visabilityFilmDescription = false;
      //           this.searchError = val['Error'];
      //         } else {
      //           this.searchResult =  val['Search'];
      //           this.visabilityFilmDescription = true;
      //           this.searchError = '';
      //         }              
      //       },
      //                 (err) => console.log('Error', err),
      //                 () => console.log('Complite')
      //       );
            
    
      
  //     .subscribe(resp => {
  //       return from(resp['Search']).pipe(
  //       map((value: any)  => {          
  //        return this.http.getMovie(value.Title);                  
  //       })
  //     ).subscribe(resp => {
  //       resp.subscribe((val: Movie) => {
  //       if(val['Error']) {
  //         this.visabilityFilmDescription = false;
  //         this.searchError = val['Error'];
  //       } else {
  //         this.searchResult.push(val);
  //         this.visabilityFilmDescription = true;
  //         this.searchError = '';
  //       }
        
  //     },
  //                 (err) => console.log('Error', err),
  //                 () => console.log('Complite')
  //     );
        
  //     });
  // });
  

  clear() {
    this.LS.claer();
  }
  
}
