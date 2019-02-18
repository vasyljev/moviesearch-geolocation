import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'film', loadChildren: './components/film/film.module#FilmModule'},
  {path: 'film/favoritas', component: FavoritesComponent} ,
  {path: 'map', loadChildren: './map/map/map.module#MapModule'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
