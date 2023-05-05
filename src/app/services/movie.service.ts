import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Movie } from '../models/movie.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { SwPush, SwUpdate } from '@angular/service-worker';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private readonly firestore: AngularFirestore, 
    private readonly swPush: SwPush, 
    private readonly swUpdate: SwUpdate
  ) {
    this.registerServiceWorker();
  }

  getMovies(searchValue: string = '', genre: string = ''): Observable<Movie[]> {
    let moviesCollection = this.firestore.collection<Movie>('movies', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (searchValue) {
        query = query.where("Title", ">=", searchValue).where("Title", "<=", searchValue + "\uf8ff");
      }
      if (genre) {
        query = query.where("Genre", "==", genre);
      }
      return query;
    });
    return moviesCollection.valueChanges();
  }

  getMovie(id: number) {
    return this.firestore.collection('movies', ref => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map(actions => {
          const data = actions.map(a => {
            const id = a.payload.doc.id;
            const movieData = a.payload.doc.data() as Movie
            return { id, ...movieData };
          });
          return data[0];
        })
      );
  }

  registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ngsw-worker.js').then(registration => {
        this.swUpdate.available.subscribe(() => {
          console.log('New version available. Installing...');
          registration.update();
        });
      }).catch((error) => {
        console.error('An error occured during registration of service worker ', error);
      });
    }
  }

  cacheMovieImages(movies: Movie[]): void {
    const imageUrls = movies.map(movie => movie.Image);
  
    imageUrls.forEach(url => {
      this.swUpdate.checkForUpdate().then(() => {
        caches.open('movie-images').then(cache => {
          cache.match(url).then(response => {
            if (!response) {
              fetch(url).then(res => {
                cache.put(url, res.clone());
              });
            }
          });
        });
      });
    });
  }
  
}
