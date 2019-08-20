import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ManagersService } from 'src/app/Services/managers.service';
import { car } from 'src/app/Helpers/dataHelpers';

@Component({
  selector: 'CarAddOrEdit',
  templateUrl: './CarAddOrEdit.component.html',
  styleUrls: ['./CarAddOrEdit.component.css']
})
export class CarAddOrEditComponent implements OnInit {


  constructor( public dialogRef:MatDialogRef<CarAddOrEditComponent> , private ser : ManagersService , public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: car) { 
    if (data.id == undefined) {
      data.available=''
      data.carNumber=''
      data.currentKM=''
      data.typeNumber=null
      data.proper=''
      this.addOrEdit = false;
      this.header = "Add a Car"
    }
    
  } 
  yesOrNo: any[] = [
    {value: 'yes'},
    {value: 'no'},
  ];
  car : car;
  addOrEdit : boolean = true 
  header : string = "Edit Car"
  ngOnInit() {
     
  }


  saveChanges(typeNumber: string, KM: string, carNumber: string, available: string, proper: string){
    
    
    if (this.addOrEdit) {
      this.updateACar(typeNumber,KM,carNumber,available,proper);
    }
    else{
      this.addACar(typeNumber,KM,carNumber,available,proper);
    }
    
  }

  addACar(typeNumber: string, KM: string, carNumber: string, available: string, proper: string){
    
    
    if (typeNumber && KM && carNumber && available && proper) {
      this.car= new car(this.data.id, parseInt(typeNumber) , KM, 
      proper, available, carNumber);
        this.ser.addACar(this.car).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }

  updateACar(typeNumber: string, KM: string, carNumber: string, available: string, proper: string){
    debugger
    
    if (typeNumber && KM && carNumber && available && proper) {
      this.car= new car(this.data.id, parseInt(typeNumber) , KM, 
      proper, available, carNumber);
        this.ser.updateACar(this.car).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }
}