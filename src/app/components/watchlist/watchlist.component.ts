import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
  movies$: Observable<Movie[]>;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.movies$= this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(movie: Movie): void {
    this.watchlistService.removeMovie(movie.id);
  }
}
