import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from '../../services/local-storage.service';
import { HttpService } from '../../services/http.service';

import { Movie } from 'src/app/models/movie';
@Component({
  selector: 'app-film-description',
  templateUrl: './film-description.component.html',
  styleUrls: ['./film-description.component.scss']
})
export class FilmDescriptionComponent implements OnInit {
 
  @Input() movies: Movie[];
  @Input() inputValue: string;
  

  constructor(private LS: LocalStorageService,
              private http: HttpService) { }

  ngOnInit() {
  }

  setMovie(movie: Object) {
    this.LS.putMoveInLS(movie);
    localStorage.setItem('inputValue', this.inputValue);
    console.log('film-desc', movie, this.inputValue);
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
    if(favoriteList.find((item: Movie) => item.Title == title)) {
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
