import { Component, OnInit } from '@angular/core';
import { CarsInfoService } from 'src/app/Services/cars-info.service';
import { CarsDitailsComponent } from 'src/app/HelpComponent/cars-ditails/cars-ditails.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { car } from 'src/app/Helpers/carAndTypes';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  availAndProperCars : Array<car>;
  uniqueModel : Array<string> = Array<string>();
  uniqueMaker : Array<string> = Array<string>();
  uniqueGear : Array<string> = Array<string>();


  constructor(private carsInfo : CarsInfoService, private fb : FormBuilder, public dialog: MatDialog ) { 

   carsInfo.GetAvailAndProperCars().subscribe(arr => {
     this.availAndProperCars = arr;
    for (let index = 0; index < this.availAndProperCars.length; index++) {
      if (!this.uniqueModel.includes(this.availAndProperCars[index].carTypes.model)) {
      this.uniqueModel.push(this.availAndProperCars[index].carTypes.model)
      }
    }
    for (let index = 0; index < this.availAndProperCars.length; index++) {
      if (!this.uniqueMaker.includes(this.availAndProperCars[index].carTypes.maker)) {
      this.uniqueMaker.push(this.availAndProperCars[index].carTypes.maker)
      }
    }
    for (let index = 0; index < this.availAndProperCars.length; index++) {
      if (!this.uniqueGear.includes(this.availAndProperCars[index].carTypes.gear)) {
      this.uniqueGear.push(this.availAndProperCars[index].carTypes.gear)
      }
    }
  })
   
  }
  openDitails(car:any){
    const dialogRef = this.dialog.open(CarsDitailsComponent,{data:{car:car}});
      dialogRef.afterClosed().subscribe(result => { 
      
    });
  }

  ngOnInit() {
    
  }
  clickk(){  
    debugger

  }
}