import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../services/local-storage.service';
import { HttpService } from '../../services/http.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  list: Movie[];

  constructor(private LS: LocalStorageService,
    private http: HttpService) { }

  ngOnInit() {
    this.getFavoriteList();
  }

  setMovie(movie: Object) {
    this.LS.putMoveInLS(movie);
  }

  getFavoriteList() {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
    this.list =  this.LS.takeFromFavorites()
  }

  removeFromFavorite(title: string) {
   let tmpList =  this.list.filter(item => item.Title != title);
   this.list = tmpList;
    localStorage.setItem('favorites', JSON.stringify(tmpList));
  }
  

}
