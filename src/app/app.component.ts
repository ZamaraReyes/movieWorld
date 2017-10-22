import { Component, NgModule, HostListener } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <input type="checkbox" id="hamburger"/>
    <label class="menuicon" for="hamburger">
        <span></span>
        <a href="#"><img src="assets/img/logomovie.png"></a>
    </label>
    <nav class="flex-container menu" style="justify-content: space-between">
      <a routerLink="/home" routerLinkActive="active"><img src="assets/img/logomovie.png"></a>
      <div>
          <ul>
            <a routerLink="/home" routerLinkActive="active"><li>Home</li></a>
            <a routerLink="/listmovies/now_playing" (click)="listmovies('now_playing')"><li>Now Playing</li></a>
            <a routerLink="/listmovies/popular" (click)="listmovies('popular')"><li>Popularity</li></a>
            <a routerLink="/listmovies/upcoming" (click)="listmovies('upcoming')"><li>Up Coming</li></a>
            <div class="btn-group" dropdown>
                <button dropdownToggle type="button">
                  Genres <span class="caret"></span>
                </button>
                <ul *dropdownMenu class="dropdown-menu" role="menu">
                  <li role="menuitem" *ngFor="let genre of genreFilms">
                    <a class="dropdown-item" routerLink="/genre/{{genre.id}}" (click)="genremovies(genre.id)">{{genre.name}}</a>
                  </li>
                </ul>
            </div>
          </ul>
      </div>
      <div class="buscador">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" [(ngModel)]="film" (keypress)="preventNumbers($event, film)" placeholder="Search film">
      </div>
    </nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent {
  title = 'app works!';
  public films: any;
  public film: string;
  public listID: string;
  public filmDetail: any;
  public genreFilms: any;
  public genreID: number;

  constructor (
    private movieService: MovieService,
    private router: Router
  ) {
    this.filmDetail = [];
    this.genreFilms = [];
  }

  @HostListener('keydown', ['$event']) preventNumbers($event, film) {
    var key = $event.which || $event.keyCode;
    if (key === 13) {
      location.reload();
      this.router.navigate(["/searchmovie", film]);
    }
  }

  listmovies(listID) {
    location.reload();
    this.router.navigate(["/listmovies", listID]);
  }
  
  genremovies(genreID) {
    location.reload();
    this.router.navigate(["/genre", genreID]);
  }
  
  ngOnInit() {
    this.movieService.getListGenres()
        .then( data => {
            this.genreFilms = data.genres;
            console.log(data);
            })
         .catch(error => {
            console.error(error);
        })
        
    }
}
