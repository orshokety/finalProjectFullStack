import { Injectable } from '@angular/core';
import { car } from '../Helpers/carAndTypes';


@Injectable({
  providedIn: 'root'
})
export class CarToPaymentService {

  constructor() { }
  car:car;
  setCar( car:car ){
    this.car = car;
  }

  getCar(): car {
    return this.car
  }
}
