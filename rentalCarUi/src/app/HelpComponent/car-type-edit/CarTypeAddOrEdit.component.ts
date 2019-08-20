import { Component, OnInit, Optional, Inject } from '@angular/core';
import { carType } from 'src/app/Helpers/dataHelpers';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ManagersService } from 'src/app/Services/managers.service';

@Component({
  selector: 'CarTypeAddOrEdit',
  templateUrl: './CarTypeAddOrEdit.component.html',
  styleUrls: ['./CarTypeAddOrEdit.component.css']
})
export class CarTypeAddOrEditComponent implements OnInit {

  constructor( public dialogRef:MatDialogRef<CarTypeAddOrEditComponent> , private ser : ManagersService , public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: carType) { 
    if (data.id == undefined) {
      data.maker = ""
      data.model = ""
      data.CostOfOverdue = null
      data.dailyCost = null
      this.header = "Add Car Type"
      this.addOrEdit = false;
    }    
  } 
  header : string = "Edit Car Type"
  imageSrc : any;
  Gears: any[] = [
    {value: 'automatic'},
    {value: 'manual'},
  ];
  carType : carType;
  addOrEdit : boolean = true 
  ngOnInit() {
     
  }
  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {this.imageSrc = reader.result;}
    }
  }


  saveChanges( maker: string, model: string, dailyCost: string, CostOfOverdue: string, year: string ,gear : string){
    if (this.addOrEdit) {
      this.updateACarType(maker, model, dailyCost, CostOfOverdue, year, gear)
    }
    else{
      this.addACarType(maker, model, dailyCost, CostOfOverdue, year, gear)
    }
  }

  addACarType( maker: string, model: string, dailyCost: string, CostOfOverdue: string, year: string ,gear : string){
    debugger
    if (maker && model && dailyCost && CostOfOverdue && year && gear ) {
      this.carType= new carType(this.data.id, maker , model, 
       parseInt(dailyCost) , parseInt(CostOfOverdue) , year, gear,this.imageSrc);
        this.ser.addACarType(this.carType).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }

  updateACarType( maker: string, model: string, dailyCost: string, CostOfOverdue: string, year: string ,gear : string){
    debugger
    if (maker && model && dailyCost && CostOfOverdue && year && gear ) {
      this.carType= new carType(this.data.id, maker , model, 
       parseInt(dailyCost) , parseInt(CostOfOverdue) , year, gear,this.imageSrc);
        this.ser.updateACarType(this.carType).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }
}
