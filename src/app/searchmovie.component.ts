import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-searchmovie',
  templateUrl: './searchmovie.component.html',
  styleUrls: ['./searchmovie.component.css']
})
export class SearchmovieComponent implements OnInit {
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
  public filmID: number;
  public genreID: number;
  public total: number;
  public filmIMDB: string;
  public listID: string;
  public videoFilm: string;
  public photo: string;
  public photos: any;
  
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location,
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
    this.film = this.route.snapshot.params['film'];
  }

  ngOnInit() {  
    this.route.paramMap
      .switchMap((params: ParamMap) => this.movieService.getFilmSearch(this.film))
      .subscribe( data => {
        this.total = data.total_results;
        this.filmDetail = data.results;
        this.photo = "http://image.tmdb.org/t/p/w1000"+data.results[0].backdrop_path;
            console.log(data);
            console.log(data.total_results);
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.movieService.getFilmDetail(this.filmID)
                .then( data => {
                  if(data.vote_average > 0){
                    this.films.push({
                        id: data.id,
                        title: data.title,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w500"+data.poster_path,
                        vote_average: data.vote_average
                    });
                  }
                  
                  this.films.forEach( (value, key) => {
                        this.filmID = value.imdb_id;
                        console.log(this.filmID);
                        this.movieService.getFilmVotes(this.filmID)
                        .then( data => {
                            console.log(data);
                            this.films[key].genres = data.Genre;
                            console.log(this.films);
                        });                   
                    })
                })
            })
        })
  	}

}
