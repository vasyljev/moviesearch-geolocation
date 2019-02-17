import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmComponent } from './film.component';
import { FilmFullInfoComponent } from '../film-full-info/film-full-info.component';

const routes: Routes = [
  {path: '', component: FilmComponent},
   {path: 'full/:title', component: FilmFullInfoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
