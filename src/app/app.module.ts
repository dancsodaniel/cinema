import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieService } from './services/movie.service';
import { environment } from 'src/environments/environment.development';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { UserFormComponent } from './components/shared/user-form/user-form.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { CinemaCardComponent } from './components/cinema-card/cinema-card.component';
import { OrderCinemasByDisplayOrderPipe } from './pipes/order-cinemas-by-display-order.pipe';
import { ReserveSeatComponent } from './components/reserve-seat/reserve-seat.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppNavbarComponent,
    MoviesDetailsComponent,
    CardMovieComponent,
    MoviesComponent,
    DialogMessageComponent,
    UserFormComponent,
    ChangePasswordComponent,
    WatchlistComponent,
    CinemasComponent,
    CinemaCardComponent,
    OrderCinemasByDisplayOrderPipe,
    ReserveSeatComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
