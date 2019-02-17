import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getMoviesList(name: string) {
    return this.http.get(`http://www.omdbapi.com/?apikey=1643f72&s=${name}`)
  }
  getMovie(name: string) {
    return this.http.get(`http://www.omdbapi.com/?apikey=1643f72&t=${name}`)
  }

  getMovieByYear(year: number, title: string) {
    let titleName: string[] = [];
    console.log('year', year);
    console.log('title', title);
    let tmpTitle = title.split(' ');
    console.log('tmpTitle', tmpTitle[0]);
    if(tmpTitle[0].length < 4 ) {
      titleName.push(tmpTitle[0], tmpTitle[1]);
    } else {
      titleName.push(tmpTitle[0]);
    }
    let strTitle = titleName.join(' ');
    return this.http.get(`http://www.omdbapi.com/?apikey=1643f72&s=${strTitle}`)
  }

}
