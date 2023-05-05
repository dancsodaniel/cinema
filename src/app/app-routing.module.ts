import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './shared/auth.guard';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { ReserveSeatComponent } from './components/reserve-seat/reserve-seat.component';
import { BookingsComponent } from './components/bookings/bookings.component';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MoviesDetailsComponent },
  { path: 'movie/:id/reserve-seat', component: ReserveSeatComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
