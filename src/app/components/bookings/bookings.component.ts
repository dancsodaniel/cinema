import { Component } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent {
  tickets: Ticket[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getTickets();
  }

  async getTickets() {
    this.tickets = await this.bookingService.getTickets();
  }
}
