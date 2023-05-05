import { Component, Input } from '@angular/core';
import { Cinema } from 'src/app/models/cinema.model';

@Component({
  selector: 'app-cinema-card',
  templateUrl: './cinema-card.component.html',
  styleUrls: ['./cinema-card.component.scss']
})
export class CinemaCardComponent {
  @Input() cinema: Cinema;
}
