import { Component, OnInit } from '@angular/core';
import { DetailComponent } from './detail.component';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public films: any;
    public film: string;
    public filmsPlaying: any;
    public filmsRated: any;
    public filmsPopular: any;
    public filmsComing: any;
    public filmDetail: any;
    public similarFilms: any;
    public genreFilms: any;
    public filmsGenre: any;
    public filmID: string;
    public genreID: number;
    public filmIMDB: string;
    public listID: string;
    public videoFilm: string;
    public photo: string;
    public photos: any;
    
  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.films = [];
    this.filmDetail = [];
    this.filmsPlaying = [];
    this.filmsRated = [];
    this.filmsPopular = [];
    this.filmsComing = [];
    this.genreFilms = [];
    this.filmsGenre = [];
    this.photos = [];
    this.photo;
  }

  moviedetail(imdb_id) {
    location.reload();
    this.router.navigate(["/detail", imdb_id]);
  }

  ngOnInit() {
    this.movieService.getFilmsComing()
        .then( data => {
            this.filmDetail = data.results;
            this.photo = "http://image.tmdb.org/t/p/w500"+data.results[0].backdrop_path;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.movieService.getFilmDetail(this.filmID)
                .then( data => {
                  if (data.backdrop_path != null && data.vote_average > 0) {
                    this.filmsComing.push({
                        id: data.id,
                        title: data.title,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w342"+data.poster_path,
                        backdrop_path: "http://image.tmdb.org/t/p/w1000"+data.backdrop_path, 
                        vote_average: data.vote_average,
                        overview: data.overview
                    });
                    
                    this.filmsComing.forEach( (value, key) => {
                        this.filmID = value.imdb_id;
                        console.log(this.filmID);
                        this.movieService.getFilmVotes(this.filmID)
                        .then( data => {
                            console.log(data);
                            this.filmsComing[key].genres = data.Genre;
                            console.log(this.filmsComing);
                        });                   
                    })
                  }
                })
            })
        })
        .catch(error => {
            console.error(error);
        })

    this.movieService.getFilmsYear()
        .then( data => {
            this.filmDetail = data.results;
            console.log(data);
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.movieService.getFilmDetail(this.filmID)
                .then( data => {
                    this.filmsPlaying.push({
                        id: data.id,
                        title: data.title,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w342"+data.poster_path,
                        backdrop_path: "http://image.tmdb.org/t/p/w1000"+data.backdrop_path, 
                        vote_average: data.vote_average,
                        overview: data.overview
                    });
                    
                    
                    this.filmsPlaying.forEach( (value, key) => {
                        this.filmID = value.imdb_id;
                        console.log(this.filmID);
                        this.movieService.getFilmVotes(this.filmID)
                        .then( data => {
                            console.log(data);
                            this.filmsPlaying[key].genres = data.Genre;
                            console.log(this.filmsPlaying);
                        });                   
                    })
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
  }

}
