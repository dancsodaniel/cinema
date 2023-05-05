import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema } from 'src/app/models/cinema.model';
import { Movie } from 'src/app/models/movie.model';
import { Seat } from 'src/app/models/seat.model';
import { Ticket } from 'src/app/models/ticket.model';
import { BookingService } from 'src/app/services/booking.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { MovieService } from 'src/app/services/movie.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-reserve-seat',
  templateUrl: './reserve-seat.component.html',
  styleUrls: ['./reserve-seat.component.scss']
})
export class ReserveSeatComponent {
  movie: Movie;
  cinemas: Cinema[] = [];
  selectedCinema: Cinema;
  seats: Seat[] = [];
  reserveForm: FormGroup;
  submitted = false;
  times = ['11:00', '17:00', '20:00'];

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private cinemaService: CinemaService, 
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private bookingService: BookingService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.reserveForm.get('email').setValue(user.email);
      }
    });

    const movieId = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(movieId).subscribe((movie) => {
      this.movie = movie;
      this.cinemaService.getCinemas().subscribe((cinemas) => {
        this.cinemas = cinemas;
      });
    });
    this.reserveForm = this.formBuilder.group({
      cinema: ['', Validators.required],
      seats: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      times: ['', [Validators.required]]
    });
  }

  onSelectCinema(): void {
    this.selectedCinema = this.reserveForm.controls['cinema'].value;
    this.seats = this.selectedCinema.seats.filter(seat => !seat.booked);
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.reserveForm.invalid) {
      return;
    }

    const currentUser = await this.auth.currentUser;

    const selectedSeat = this.reserveForm.controls['seats'].value;

    const ticket: Ticket = {
      id: uuidv4(),
      userId: currentUser ? currentUser.uid : null,
      movie: this.movie.Title,
      cinema: this.selectedCinema.name,
      seat: `row: ${selectedSeat.row} column: ${selectedSeat.column}`,
      name: this.reserveForm.controls['name'].value,
      email: this.reserveForm.controls['email'].value,
      time: this.reserveForm.controls['times'].value
    };

    this.bookingService.addTicket(ticket).then(() => {
      console.log('Ticket is saved');
    }).catch((error) => {
      console.log('An error occured while saving the reservation', error);
    });

    this.cinemaService.updateSeatBooking(this.selectedCinema.id, selectedSeat);

    this.router.navigate(['movies']);
  }
}
