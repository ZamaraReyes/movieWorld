import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from './movie.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    public film: any;
    public filmDetail: any;
    public similarFilms: any;
    public films: any;
    public filmID: string;
    public votes: any;
    public filmIMDB: string;
    public videoUrl: string;
    public photo: string;
  
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.film = [];
    this.votes = [];
    this.filmDetail = [];
    this.similarFilms = [];
    this.photo;
    this.videoUrl;
    this.filmID = this.route.snapshot.params['imdb_id'];
  }
  
  goBack(): void {
    this.location.back();
  }

  moviedetail(imdb_id) {
    location.reload();    
    this.router.navigate(["/detail", imdb_id]);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.movieService.getFilmDetail(this.filmID))
      .subscribe( data => {
        this.film = data;
        console.log(data);
        this.photo = "http://image.tmdb.org/t/p/w1000"+data.backdrop_path;
      });
      
    this.movieService.getFilmVotes(this.filmID)
        .then( data => {
            this.votes = data;
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })
        
    this.movieService.getFilmSimilar(this.filmID)
        .then( data => {
            console.log(data.results);
            this.filmDetail = data.results;
            this.filmDetail.forEach( (value) => {
                this.filmID = value.id;
                this.movieService.getFilmDetail(this.filmID)
                .then( data => {
                    this.similarFilms.push({
                        id: data.id,
                        title: data.title,
                        imdb_id: data.imdb_id,
                        poster_path: "http://image.tmdb.org/t/p/w1000"+data.poster_path
                    });
                    
                    this.similarFilms.forEach( (value, key) => {
                        this.filmID = value.imdb_id;
                        console.log(this.filmID);
                        this.movieService.getFilmVotes(this.filmID)
                        .then( data => {
                            console.log(data);
                            this.similarFilms[key].genres = data.Genre;
                            console.log(this.similarFilms);
                        });                   
                    })
                })
            })
        })
        .catch(error => {
            console.error(error);
        })
        
        this.movieService.getFilmVideo(this.filmID)
            .then( data => {
            console.log(data);
                if(data.results.length > 0) {
                    this.videoUrl = "https://www.youtube.com/embed/"+data.results[0].key;
                } else if(data.results.length < 0){
                    this.videoUrl = "https://www.youtube.com/embed/";
                }
                
            })
            .catch(error => {
                console.error(error);
            })
  }

}