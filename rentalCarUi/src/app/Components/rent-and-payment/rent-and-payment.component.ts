import { Component, OnInit } from '@angular/core';
import { CarToPaymentService } from 'src/app/Services/car-to-payment.service';
import { car } from 'src/app/Helpers/carAndTypes';
import { Router } from '@angular/router';
import { RouterHelper } from 'src/app/Helpers/RouterHelper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { OrdersService } from 'src/app/Services/orders.service';
import { newOrder } from 'src/app/Helpers/dataHelpers';

@Component({
  selector: 'app-rent-and-payment',
  templateUrl: './rent-and-payment.component.html',
  styleUrls: ['./rent-and-payment.component.css']
})
export class RentAndPaymentComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  car:car;
  minDate:Date = new Date();
  startDay:Date;
  cost:number;
  endDay:Date;
  startForEnd:Date = new Date();
  diffDays:any;
  

  constructor(carPaymentSer:CarToPaymentService, private router:Router, private fb : FormBuilder, private dateError : MatSnackBar, private ser : OrdersService) { 
    if (carPaymentSer.getCar()) {
      this.car = carPaymentSer.getCar();
    }
    else{
      router.navigateByUrl(RouterHelper.search)
    }
  }

  newOrder(){
    debugger
    var newOrd : newOrder = new newOrder(this.car.carNumber,this.startDay,this.endDay)
    this.ser.postNewOrder(newOrd).subscribe()

  }

  costFunc(){
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  this.diffDays = Math.round(Math.abs((this.startDay.getTime() - this.endDay.getTime())/(oneDay)));
  if (this.startDay.getTime() == this.endDay.getTime()) {
    this.dateError.open("Start Date and Return Date cant be even", "", {
      duration: 2000,
    });
    this.cost=null;
  }
  else{  
    this.cost = this.diffDays * this.car.carTypes.dailyCost;
    this.firstFormGroup.value.cost = this.cost
  }
  }

  home(){
    this.router.navigateByUrl(RouterHelper.home)
  }

  startDate(event:Date){
   this.startDay = event
   this.startForEnd = this.startDay
   if (this.endDay) {
    if (this.endDay >= this.startDay){
      this.costFunc()
     }
   }
  }

  endDate(event:Date){
   this.endDay = event
   if (this.startDate){
   if (this.endDay >= this.startDay){
    this.costFunc()
    }
  }
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      startDay: ['', Validators.required],
      endDay: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      cardType: ['', Validators.required],
      cardNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      expiryDate: ['', Validators.required],
      securityCode: ['', Validators.required],
    });
  }

  payments: any[] = [
    {value: 'Visa'},
    {value: 'American Express'},
    {value: 'Master Card'},

  ];
}


