import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Location } from '@angular/common';

import { LocalStorageService } from '../../services/local-storage.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-film-full-info',
  templateUrl: './film-full-info.component.html',
  styleUrls: ['./film-full-info.component.scss']
})
export class FilmFullInfoComponent implements OnInit {

  movie: Movie;
  movieInfo: Movie;
  favorite: boolean;

  constructor( private LS: LocalStorageService,
              private _location: Location,
              private http: HttpService ) {
    
  }

  ngOnInit() {
    this.movie = this.LS.takeMovieFromLS();
    this.getMovieInfo(this.movie.Title);
    console.log('Film-full on init', this.movie);
    this.setFavoriteStatus(this.movie.Title);
  }


  getMovieInfo(title: string) {
    let movieTitle: string;
    if(title.search(' ') != -1) {
      let tmpItemArr = title.split(' ');
      let tmpItemString = tmpItemArr.join('+');
      movieTitle = tmpItemString;
    }   else {
      movieTitle = title;
    }   
    console.log('getMovieInfo movieTitle', movieTitle); 
    this.http.getMovie(movieTitle).subscribe((resp: Movie) => {
      this.movieInfo = resp;
    });
  }

  goToMovieSearch() {
    this._location.back();
  } 

  addOrRemoveFavorite(title: string) {
    let favoriteList = this.LS.takeFromFavorites();
    if(favoriteList.find(item => item.Title == title)) {
      this.LS.removeFromFavorites(title);
    } else {
      this.LS.putInFavorites(this.movie);
    }
    this.setFavoriteStatus(title);
  }
  setFavoriteStatus(title: string) {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
    let favoriteList = this.LS.takeFromFavorites();
    if(favoriteList.find((item: Movie) => item.Title == title)) {
      this.favorite = true;
    } else {
      this.favorite = false;
    }
  }

  setMovieDescription(movie: any) {
    this.movie = movie;
    this.movieInfo = movie;
    this.setFavoriteStatus(this.movie.Title);

  }

}
