import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { CarToPaymentService } from 'src/app/Services/car-to-payment.service';
import { car } from 'src/app/Helpers/carAndTypes';

@Component({
  selector: 'app-cars-ditails',
  templateUrl: './cars-ditails.component.html',
  styleUrls: ['./cars-ditails.component.css']
})
export class CarsDitailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<CarsDitailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialog: MatDialog, private ser: CarToPaymentService) { 

  }


  toRentPage(car:car){
    this.ser.setCar(car)
    this.close()
    this.router.navigateByUrl("/rentAndPayment")

  }
  close(){
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  isLogedIn():boolean{
    if (localStorage.getItem("token")==null) {
      return false
    }
    return true
  }
}
