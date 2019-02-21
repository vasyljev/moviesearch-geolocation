import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Location } from '@angular/common';

import { LocalStorageService } from '../../services/local-storage.service';
import { HttpService } from '../../services/http.service';
// import { map } from 'rxjs/operators';

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
    console.log(this.movieInfo);
    this.setFavoriteStatus(this.movie.Title);
  }


  getMovieInfo(title: string) {
    let movieTitle: string;
    if(title.search(' ') != -1) {
      let tmpItemArr = title.split(' ');
      let tmpItemString = tmpItemArr.join('+');
      movieTitle = tmpItemString;
    }       
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
      console.log('remove 1');
      this.LS.removeFromFavorites(title);
    } else {
      this.LS.putInFavorites(this.movie);
      // let _button = event.target as HTMLButtonElement;
      // _button.style.opacity = '0';
    }
    this.setFavoriteStatus(title);
  }
  setFavoriteStatus(title: string) {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
    let favoriteList = this.LS.takeFromFavorites();
    if(favoriteList.find(item => item.Title == title)) {
      this.favorite = true;
    } else {
      this.favorite = false;
    }
  }

  setMovieDescription(movie: any) {
    this.movie = movie;
    this.movieInfo = movie;
  }

}
