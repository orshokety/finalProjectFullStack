import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsInfoService {
  
  constructor(private http : HttpClient) { }
  GetAvailAndProperCars():any {
    return this.http.get("http://localhost:49909/api/rentalCar/getAvailAndProperCars",{headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '
    }})
    
  }
  GetCarById():any {
    return this.http.get("http://localhost:49909/api/rentalCar/getCarById",{headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization':'Basic '
    }})
  }
  
}
