import { Component, OnInit, Input } from '@angular/core';

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
export class RecommendedComponent implements OnInit {

  recomendedList: any[];

  @Input() year: number;
  @Input() title: string;
  @Input() genre: string;
  


  constructor(private http: HttpService,
    private LS: LocalStorageService) { }

  ngOnInit() {
    setTimeout(()=>  this.getRecomendedList(this.year, this.title, this.genre), 500);
    
  }


  getRecomendedList(year: number, title: string, genre: string) {
    this.recomendedList = [];
    let tmpArrGenre = genre.split(', ');
    this.http.getMovieByYear(year, title).subscribe(resp => from(resp['Search']).pipe(
      flatMap(item => { 
        return this.http.getMovie(item['Title'])}),
        filter(item => item['Title'] !== title),
        filter(item => {
          let tmpItemArr = item['Genre'].split(', ');
          for(let i of tmpArrGenre) {
            console.log('i', i, tmpItemArr);
            return tmpItemArr.indexOf(i) != -1 ? true : false;
          }
          
        })
        )
      .subscribe(resp => {
        this.recomendedList.push(resp);
        console.log('resp', this.recomendedList);
      })
      
      
     )   
    

  }

  setMovie(movie: Object) {
    this.LS.putMoveInLS(movie);
    // console.log('input', this.inputValue);
    // localStorage.setItem('inputValue', this.inputValue);
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
    if(favoriteList.find(item => item.Title == title)) {
      return true;
    } else {
      return false;
    }
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
