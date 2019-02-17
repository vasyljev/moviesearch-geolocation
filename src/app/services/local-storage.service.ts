import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  putMoveInLS(data: any) {
    localStorage.setItem('movie', JSON.stringify(data));
  }

  takeMovieFromLS() {
    return JSON.parse(localStorage.getItem('movie'));
  }

  putInFavorites(movie: Movie) {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
      let list = JSON.parse(localStorage.getItem('favorites'));
      for(let item of list) {
        if(item.Title == movie.Title) {          
          return;
        }
      }
      list.push(movie);
      localStorage.setItem('favorites', JSON.stringify(list));
  }

  takeFromFavorites() {
    if(!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } 
    return JSON.parse(localStorage.getItem('favorites'));
  }

  removeFromFavorites(title: string) {
    let list = this.takeFromFavorites();
    let newList = list.filter(item => item.Title !== title);
    localStorage.setItem('favorites', JSON.stringify(newList));
    return newList;
  }

  claer() {
    localStorage.clear();
  }
}
