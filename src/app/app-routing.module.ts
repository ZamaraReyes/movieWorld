import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListmoviesComponent } from './listmovies.component';
import { GenresComponent } from './genres.component';
import { DetailComponent } from './detail.component';
import { SearchmovieComponent } from './searchmovie.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'listmovies/:listID',  component: ListmoviesComponent },
  { path: 'genre/:genreID',  component: GenresComponent },
  { path: 'detail/:imdb_id',  component: DetailComponent },
  { path: 'searchmovie/:film',  component: SearchmovieComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/