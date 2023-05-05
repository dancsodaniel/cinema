import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Watchlist } from '../models/watchlist.model';
import { Observable, map, switchMap } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private watchlistCollection: AngularFirestoreCollection<Watchlist>;
  private userId: string;
  private movies$: Observable<Movie[]>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.movies$ = this.auth.getUserIdObservable().pipe(
      switchMap(userId => {
        this.userId = userId;
        this.watchlistCollection = this.firestore.collection<Watchlist>('watchlist', ref => ref.where('userId', '==', userId));

        return this.watchlistCollection.valueChanges().pipe(
          map(watchlist => watchlist.length > 0 ? watchlist[0].movies : [])
        );
      })
    );
  }

  getWatchlist(): Observable<Movie[]> {
    return this.movies$;
  }

  addMovie(movie: Movie): void {
    if (this.watchlistCollection) {
      this.watchlistCollection.get().toPromise().then(snapshot => {
        if (snapshot.size > 0) {
          const doc = snapshot.docs[0];
          const watchlist = doc.data();
          watchlist.movies.push(movie);
          this.watchlistCollection.doc(doc.id).set(watchlist);
        } else {
          const watchlist: Watchlist = { userId: this.userId, movies: [movie] };
          this.watchlistCollection.add(watchlist);
        }
      });
    }
  }

  removeMovie(movieId: number): void {
    if (this.watchlistCollection) {
      this.watchlistCollection.get().toPromise().then(snapshot => {
        if (snapshot.size > 0) {
          const doc = snapshot.docs[0];
          const watchlist = doc.data();
          watchlist.movies = watchlist.movies.filter(m => m.id != movieId);
          this.watchlistCollection.doc(doc.id).set(watchlist);
        }
      });
    }
  }

  isMovieInWatchlist(movieId: number): Observable<boolean> {
    return this.getWatchlist().pipe(
      map(movies => movies.some(m => m.id == movieId))
    );
  }
}
