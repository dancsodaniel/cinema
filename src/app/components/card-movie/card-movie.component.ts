import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent {
  @Input('movie') movie: Movie;
  @Input() isInWatchlist: boolean;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  isMoviePopular(movie: Movie): boolean {
    return movie.Rate > 7;
  }
}
