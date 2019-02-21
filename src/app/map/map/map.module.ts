import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { IndexSearchComponent } from '../index-search/index-search.component';

import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [MapComponent,
    IndexSearchComponent,
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfy4vrgoM5ec98C9CYWtqYXZSZc74Cmyo',
      libraries: ["places"]
    }),
    
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class MapModule { }
