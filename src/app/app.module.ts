import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MovieService } from './movie.service';
import { AppComponent } from './app.component';
import { SearchmovieComponent } from './searchmovie.component';
import { ListmoviesComponent } from './listmovies.component';
import { GenresComponent } from './genres.component';
import { DetailComponent } from './detail.component';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchmovieComponent,
    ListmoviesComponent,
    GenresComponent,
    DetailComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
