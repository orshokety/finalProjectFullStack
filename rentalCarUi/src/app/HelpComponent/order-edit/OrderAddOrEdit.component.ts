import { Component, OnInit, Optional, Inject } from '@angular/core';
import { order } from 'src/app/Helpers/dataHelpers';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ManagersService } from 'src/app/Services/managers.service';

@Component({
  selector: 'OrderAddOrEdit',
  templateUrl: './OrderAddOrEdit.component.html',
  styleUrls: ['./OrderAddOrEdit.component.css']
})
export class OrderAddOrEditComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<OrderAddOrEditComponent> , private ser : ManagersService , public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: order) {
  
    if (data.id == undefined) {
      data.carNumber = ''
      data.userIDNumber = ''
      data.startDate = new Date()
      data.endDate = new Date()
      data.returnDate 
      this.addOrEdit = false;
      this.header = "Add a Order"
    }

   } 
  order : order;
  addOrEdit : boolean = true;
  header : string = "Edit a Order"
  ngOnInit() {
    
  }


  saveChanges(carNumber: string, userIDNumber: string, startDate: string, endDate: string, returnDate: string){
    if (this.addOrEdit) {
      this.updateAOrder(carNumber,userIDNumber,startDate,endDate,returnDate);
    }
    else{
      this.addAOrder(carNumber,userIDNumber,startDate,endDate,returnDate);
    }

  }

  addAOrder(carNumber: string, userIDNumber: string, startDate: string, endDate: string, returnDate?: string){

    if (carNumber && userIDNumber && startDate && endDate ) {
      debugger
      this.order= new order(carNumber , userIDNumber, 
        new Date(startDate), new Date(endDate), returnDate? new Date(returnDate):null);
        this.ser.addAOrder(this.order).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }

  updateAOrder(carNumber: string, userIDNumber: string, startDate: string, endDate: string, returnDate: string){
    debugger
    
    if (carNumber && userIDNumber && startDate && endDate && returnDate) {
      this.order= new order(carNumber , userIDNumber, 
        new Date(startDate), new Date(endDate), new Date(returnDate));
        this.ser.updateAOrder(this.order).subscribe(res =>{});
        this.dialogRef.close()
    }
    
  }
}
