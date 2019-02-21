import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';
import { FilmDescriptionComponent } from '../film-description/film-description.component';
import { FilmFullInfoComponent } from '../film-full-info/film-full-info.component';
import { RecommendedComponent } from '../recommended/recommended.component';

import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [FilmComponent,
    FilmDescriptionComponent,
    FilmFullInfoComponent,
    RecommendedComponent
  ],
  imports: [
    CommonModule,
    FilmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class FilmModule { }
