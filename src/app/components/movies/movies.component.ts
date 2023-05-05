import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genres = [
    { name: 'All Genres', value: '' },
    { name: 'Action', value: 'Action' },
    { name: 'Comedy', value: 'Comedy' },
    { name: 'Drama', value: 'Drama' },
  ];
  selectedGenre: string = '';
  searchValue: string = '';

  constructor(private movieService: MovieService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(searchValue: string = '', genre: string = ''): void {
    this.movieService.getMovies(searchValue, genre)
    .subscribe(response => {
     this.movies = response;
     this.changeDetector.detectChanges();
     this.movieService.cacheMovieImages(this.movies);
    });
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
  }

  onSearchClick(searchValue: string): void {
    this.getMovies(searchValue, this.selectedGenre);
  }

  resetSearch(): void {
    this.searchValue = '';
    this.selectedGenre = '';
    this.getMovies();
  }
}
