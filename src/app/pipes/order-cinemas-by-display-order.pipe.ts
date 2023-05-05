import { Pipe, PipeTransform } from '@angular/core';
import { Cinema } from '../models/cinema.model';

@Pipe({
  name: 'orderCinemasByDisplayOrder'
})
export class OrderCinemasByDisplayOrderPipe implements PipeTransform {

  transform(cinemas: Cinema[]): Cinema[] {
    return cinemas.sort((a, b) => a.displayOrder - b.displayOrder);
  }

}
