import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { HttpService } from '../../services/http.service';
import { LocalStorageService }  from '../../services/local-storage.service';
import { Movie } from '../../models/movie';
import { from } from 'rxjs';
import { flatMap, filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit, OnDestroy {

  @Input() year: number;
  @Input() title: string;
  @Input() genre: string;

  @Output() setMovieDescription = new EventEmitter<any>();
  
  subscriber: any;
  movieValue: Movie;
  recomendedList: any[];
  
  constructor(private http: HttpService,
    private LS: LocalStorageService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.title && this.genre ?  setTimeout(()=>  this.getRecomendedList(this.title, this.genre), 500) : console.log('Wait!');    
  }

  ngOnDestroy() {
    this.subscriber ? this.subscriber.unsubscribe() : '';
  }


  getRecomendedList(title: string, genre: string) {
    this.recomendedList = [];
    let tmpArrGenre = genre.split(', ');
    this.subscriber = this.http.getMovieByYear(title)
    .pipe(
      switchMap(({Search}) => from(Search)),
      flatMap(({Title}) => this.http.getMovie(Title)),
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
  }

  setMovie(movie: any) {
    this.setMovieDescription.emit(movie);
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
    return favoriteList.find((item: Movie) => item.Title == title);
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
