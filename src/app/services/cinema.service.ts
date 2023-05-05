import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cinema } from '../models/cinema.model';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(private firestore: AngularFirestore) {}

  getCinemas(): Observable<Cinema[]> {
    return this.firestore.collection<Cinema>('cinemas').valueChanges();
  }

  async updateSeatBooking(cinemaId: number, seat: Seat): Promise<void> {
    const cinemaDocRef = this.firestore.collection<Cinema>('cinemas').doc(String(cinemaId)).ref;

    try {
      const cinemaDoc = await cinemaDocRef.get();

      if (!cinemaDoc.exists) {
        console.error('Cinema not found');
        return;
      }

      const cinemaData = cinemaDoc.data() as Cinema;
      const seats = cinemaData.seats;

      const targetSeat = seats.find(s => s.row === seat.row && s.column === seat.column);

      if(!targetSeat) {
        console.error('Seat not found');
        return;
      }

      targetSeat.booked = true;

      await cinemaDocRef.update({ seats: seats });

      console.log('Cinema updated');
    } catch (error) {
      console.error('Error updating seat status:', error);
    }
  }
}
