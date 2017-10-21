import { Component, OnInit, Input } from '@angular/core';
import { DetailComponent } from './detail.component';
import { MovieService } from './movie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {
    public title: string;
    public tit: string;
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
    this.listID = this.route.snapshot.params['listID'];
    this.title = this.listID.charAt(0).toUpperCase() + this.listID.slice(1);
    
    if (this.title.charAt(3) == "_") {
        this.title = this.listID.charAt(0).toUpperCase() + this.listID.slice(1, 3) + " " + this.listID.slice(4, 11);
    }
  }

  moviedetail(imdb_id) {
    this.router.navigate(["/detail", imdb_id]);
  }

  ngOnInit() {
  	this.movieService.getFilms(this.listID)
        .then( data => {
            this.filmDetail = data.results;
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
