import { Injectable } from '@angular/core';
import { newOrder } from '../Helpers/dataHelpers';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { 
  }
  postNewOrder(order : newOrder , token : string = localStorage.getItem("token")){
    return this.http.post("http://localhost:49909/api/rentalCar/newOrder",order,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
     'Authorization': 'Basic '+ token
    }})
  }
}
