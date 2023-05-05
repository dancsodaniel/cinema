import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { take } from 'rxjs/operators';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  movie: Movie;
  isInWatchlist$: Observable<boolean>;

  constructor(
    private movieService: MovieService, 
    private route: ActivatedRoute,
    private watchlistService: WatchlistService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.movieService.getMovie(id).pipe(take(1)).subscribe(movie => {
      this.movie = movie;
      this.isInWatchlist$ = this.watchlistService.isMovieInWatchlist(this.movie.id);
    });
  }

  handleWatchlist(): void { 
    this.watchlistService.addMovie(this.movie);
    this.isInWatchlist$ = this.watchlistService.isMovieInWatchlist(this.movie.id);
  }

  onReserve(): void {
    this.router.navigate(['movie', this.movie.id, 'reserve-seat']);
  }
}
