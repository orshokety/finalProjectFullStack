import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user, car, carType, order } from '../Helpers/dataHelpers';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  constructor(private http : HttpClient) { }
  
  getAllUsers(token : string = localStorage.getItem('token')):any {
    return this.http.get("http://localhost:49909/api/rentalCar/getAllUsers", {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '+ token
    }})
  }

  deleteUser(id: number, token : string = localStorage.getItem('token')) {
    return this.http.delete(`http://localhost:49909/api/rentalCar/deleteAUser/${id}`, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
      'Authorization': 'Basic '+ token
    }})
  }

  updateAUser(user:user, token : string = localStorage.getItem("token")){
    return this.http.put(`http://localhost:49909/api/rentalCar/updateAUser/${user.id}`, user, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Put',
      'Authorization': 'Basic '+ token
    }});
  }

  addAUser(user : user ){
    return this.http.post("http://localhost:49909/api/rentalCar/registerUser",user,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
     
    }})
  }

  getAllCars(token : string = localStorage.getItem('token')):any {
    
    return this.http.get("http://localhost:49909/api/rentalCar/getAllCars",{headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '+ token
    }})
  }

  deleteCar(id: number, token : string = localStorage.getItem('token')) {
    // debugger
    return this.http.delete(`http://localhost:49909/api/rentalCar/deleteACar/${id}`, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
      'Authorization': 'Basic '+ token
    }})
  }

  
  updateACar(car : car, token : string = localStorage.getItem("token")){
    return this.http.put(`http://localhost:49909/api/rentalCar/updateACar/${car.id}`, car, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Put',
      'Authorization': 'Basic '+ token
    }});
  }

  addACar(car : car , token : string = localStorage.getItem("token")){
    return this.http.post("http://localhost:49909/api/rentalCar/addACar",car,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
     'Authorization': 'Basic '+ token
    }})
  }

  getAllCarTypes(token : string = localStorage.getItem('token')):any {
    
    return this.http.get("http://localhost:49909/api/rentalCar/getAllCarTypes",{headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '+ token
    }})
    
  }

  deleteCarType(id: number, token : string = localStorage.getItem('token')) {
    return this.http.delete(`http://localhost:49909/api/rentalCar/deleteACarType/${id}`, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
      'Authorization': 'Basic '+ token
    }})
  }

  
  updateACarType(catType:carType, token : string = localStorage.getItem("token")){
    return this.http.put(`http://localhost:49909/api/rentalCar/updateACarType/${catType.id}`, catType, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Put',
      'Authorization': 'Basic '+ token
    }});
  }

  addACarType(carType : carType , token : string = localStorage.getItem("token")){
    return this.http.post("http://localhost:49909/api/rentalCar/addACarType",carType,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
     'Authorization': 'Basic '+ token
    }})
  }

  getAllOrders(token : string = localStorage.getItem('token')):any {
    return this.http.get("http://localhost:49909/api/rentalCar/getAllOrders",{headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '+ token
    }})
  }

  deleteOrder(id: number, token : string = localStorage.getItem('token')) {
    return this.http.delete(`http://localhost:49909/api/rentalCar/deleteAOrder/${id}`, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
      'Authorization': 'Basic '+ token
    }})
  }

  
  updateAOrder(order : order, token : string = localStorage.getItem("token")){
    return this.http.put(`http://localhost:49909/api/rentalCar/updateAOrder/${order.id}`, order, {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Put',
      'Authorization': 'Basic '+ token
    }});
  }

  addAOrder(order : order , token : string = localStorage.getItem("token")){
    return this.http.post("http://localhost:49909/api/rentalCar/addAOrder",order,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post',
     'Authorization': 'Basic '+ token
    }})
  }

}
