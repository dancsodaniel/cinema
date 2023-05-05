import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema } from 'src/app/models/cinema.model';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent {
  cinemas$: Observable<Cinema[]>;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemas$ = this.cinemaService.getCinemas();
  }
}
