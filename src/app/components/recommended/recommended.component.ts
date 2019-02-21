import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { HttpService } from '../../services/http.service';
import { LocalStorageService }  from '../../services/local-storage.service';
import { Movie } from '../../models/movie';
import { of, from } from 'rxjs';
import { map, flatMap,filter } from 'rxjs/operators';


@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit, OnDestroy {

  recomendedList: any[];

  @Input() year: number;
  @Input() title: string;
  @Input() genre: string;

  @Output() setMovieDescription = new EventEmitter<any>();
  
  subscriber: any;
  movieValue: Movie;

  constructor(private http: HttpService,
    private LS: LocalStorageService) { }

  ngOnInit() {
    setTimeout(()=>  this.getRecomendedList(this.year, this.title, this.genre), 700);
    
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }


  getRecomendedList(year: number, title: string, genre: string) {
    this.recomendedList = [];
    let tmpArrGenre = genre.split(', ');
    this.subscriber = this.http.getMovieByYear(year, title).subscribe(resp => from(resp['Search']).pipe(
      flatMap(item => { 
        return this.http.getMovie(item['Title'])}),
        filter(item => item['Title'] !== title),
        filter(item => {
          let tmpItemArr = item['Genre'].split(', ');
          for(let i of tmpArrGenre) {
            if(tmpItemArr.indexOf(i) != -1) {
              return true;
            } else {
              continue;
            }             
          }
          
        })
      )
      .subscribe(resp => {
        this.recomendedList.push(resp);
      })
     )   
  }

  setMovie(movie: any) {
    this.setMovieDescription.emit(movie);
    // this.LS.putMoveInLS(movie);
    // console.log('input', this.movieValue);
    // this.movieValue = movie;
    // localStorage.setItem('inputValue', JSON.stringify(movie));
  }

  toFavorit(title: string) {
    this.http.getMovie(title).subscribe((movie: Movie) => {
      this.LS.putInFavorites(movie);
    });    
  }

  setFavValue(title: string) {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
    let favoriteList = this.LS.takeFromFavorites();
    return favoriteList.find(item => item.Title == title);
  }
  

  addOrRemoveFavorite(title: string) {
    let status = this.setFavValue(title);
    if(status) {
      this.LS.removeFromFavorites(title);
    } else {
      this.toFavorit(title);
    }
  }


}
