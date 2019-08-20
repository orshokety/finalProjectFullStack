import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Helpers/dataHelpers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  postLogin(userName:string, password:string){
    return this.http.post("http://localhost:49909/api/rentalCar/login",{userName,password},{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post'
    }})
  }
  
  postRegister(user : user){
    return this.http.post("http://localhost:49909/api/rentalCar/registerUser",user,{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post'
    }})
  }
  
  postUserType(token : string = localStorage.getItem("token")){
    
    return this.http.post("http://localhost:49909/api/rentalCar/Type",{"token":token},{headers:{
     'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Post'
    }});

  }

  getNameAndPic(token : string ):any{
    return this.http.get("http://localhost:49909/api/rentalCar/getNameAndPic", {headers:{
      'Content-Type':'application/json;charest=utf-8','Access-Control-Allow-Method':'Get',
      'Authorization': 'Basic '+ token
    }});
  }


}
