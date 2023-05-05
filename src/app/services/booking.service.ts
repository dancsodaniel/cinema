import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private db: IDBDatabase;
  private ticketCollection = this.firestore.collection<Ticket>('tickets');

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    const request: IDBOpenDBRequest = window.indexedDB.open('cinema-app', 5);

    request.onerror = (event) => {
      console.error('IndexDB error: event: ', event);
    };

    request.onsuccess = () => {
      this.db = request.result;
    };

    request.onupgradeneeded = (event) => {
      const request = event.target as IDBRequest;
      const db = request.result;
    
      const ticketStore = db.createObjectStore('tickets', { autoIncrement: true });
      ticketStore.createIndex('id', 'id', { unique: true });
    };
    

    this.ticketCollection.snapshotChanges().subscribe((snapshot) => {
      snapshot.forEach((docChange) => {
        const ticket = docChange.payload.doc.data() as Ticket;
        ticket.id = docChange.payload.doc.id;
    
        switch (docChange.type) {
          case 'modified':
            this.updateTicketInIndexDB(ticket);
            break;
        }
      });
    });    
  }

  addTicket(ticket: Ticket): Promise<DocumentReference<Ticket>> {
    return this.ticketCollection.add(ticket);
  }

  async getTickets(): Promise<Ticket[]> {
    if (!this.db) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.getTickets();
    }

    const user = await this.auth.currentUser;
    const userId = user?.uid;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('tickets', 'readonly');
      const store = transaction.objectStore('tickets');
      const request = store.getAll();
  
      request.onerror = (event) => {
        reject(request.error);
      };
  
      request.onsuccess = (event) => {
        const tickets = request.result.filter(ticket => ticket.userId === userId);
        resolve(tickets);
      };
    });
  }

  updateTicketInIndexDB(ticket: Ticket): void {
    const transaction = this.db.transaction('tickets', 'readwrite');
    const store = transaction.objectStore('tickets');
    const request = store.put(ticket);
  
    request.onerror = () => {
      console.error(request.error);
    };
  }
}
