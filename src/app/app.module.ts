import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FilmDescriptionComponent } from './components/film-description/film-description.component';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
import { LocalStorageService } from './services/local-storage.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { IndexSearchComponent } from './map/index-search/index-search.component';





const config = {
  apiKey: "AIzaSyC-F2cXGzpgemqiuJgPxvvujLRnoMXqqZQ",
    authDomain: "angular-project-7c49a.firebaseapp.com",
    databaseURL: "https://angular-project-7c49a.firebaseio.com",
    projectId: "angular-project-7c49a",
    storageBucket: "angular-project-7c49a.appspot.com",
    messagingSenderId: "633947831153"
};

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  providers: [HttpService,
    LocalStorageService,
    AngularFireModule,
    AngularFireAuth,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
