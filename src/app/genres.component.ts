import { Component, OnInit } from '@angular/core';
import { DetailComponent } from './detail.component';
import { MovieService } from './movie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
    public films: any;
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
    public genreName: string;
    public filmIMDB: string;
    public listID: string;
    public videoFilm: string;
    public loader: any;
    public photo: string;
    public photos: any;
    
  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
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
    this.genreID = this.route.snapshot.params['genreID'];
  }
  
  moviedetail(imdb_id) {
    this.router.navigate(["/detail", imdb_id]);
  }

  ngOnInit() {
    this.movieService.getListGenres()
        .then( data => {
        this.filmDetail = data.genres;
        this.filmDetail.forEach( (value) => {
            if(value.id == this.genreID) {
                this.genreName = value.name;
            }
        })
    })
    
    this.movieService.getListFilms(this.genreID)
        .then( data => {
            this.filmDetail = data.results;
            console.log(data);
            this.photo = "http://image.tmdb.org/t/p/w1000"+data.results[0].backdrop_path;
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
        .catch(error => {
            console.error(error);
        })
  }

}
