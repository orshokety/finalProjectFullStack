import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ManagersService } from 'src/app/Services/managers.service';
import { order } from 'src/app/Helpers/dataHelpers';
import { OrderAddOrEditComponent } from 'src/app/HelpComponent/order-edit/OrderAddOrEdit.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private ser: ManagersService, private dialog: MatDialog) {
    this.ser.getAllOrders().subscribe(arr=> this.allOrders = new MatTableDataSource(arr));
   }
   allOrders: MatTableDataSource<any>;
   allOrdersColumns: Array<string> = Array<string>('ID', 'Car number', 'User idNumber', 'Start date', 'End date', 'Return date', 'Actions' );
   OrdersFilter(filterValue: string) {
    this.allOrders.filter = filterValue.trim().toLowerCase();
  }

  addOrEditOrder(order:order= null){
    
    const dialogRef = this.dialog.open(OrderAddOrEditComponent,{data: order})
    dialogRef.afterClosed().subscribe(result => {
          this.ser.getAllOrders().subscribe(arr=> this.allOrders = new MatTableDataSource(arr));
    });
  }
  
  ngOnInit() {
  }

}
