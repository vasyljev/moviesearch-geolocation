import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';
import { FilmDescriptionComponent } from '../film-description/film-description.component';
import { FilmFullInfoComponent } from '../film-full-info/film-full-info.component';
import { RecommendedComponent } from '../recommended/recommended.component';


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
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class FilmModule { }
