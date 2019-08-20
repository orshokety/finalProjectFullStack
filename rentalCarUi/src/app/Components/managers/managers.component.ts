import { Component, OnInit } from '@angular/core';
import { ManagersService } from 'src/app/Services/managers.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DialogYesOrNoComponent } from 'src/app/HelpComponent/dialog-yes-or-no/dialog-yes-or-no.component';
import { UserAddOrEditComponent } from 'src/app/HelpComponent/UserAddOrEdit/UserAddOrEdit.component';
import { CarAddOrEditComponent } from 'src/app/HelpComponent/car-edit/CarAddOrEdit.component';
import { CarTypeAddOrEditComponent } from 'src/app/HelpComponent/car-type-edit/CarTypeAddOrEdit.component';
import { OrderAddOrEditComponent } from 'src/app/HelpComponent/order-edit/OrderAddOrEdit.component';
import { user , car , carType, order } from 'src/app/Helpers/dataHelpers';


@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  constructor(private ser: ManagersService, private dialog: MatDialog) {
    this.ser.getAllUsers().subscribe(arr=> {
      this.allUsers = new MatTableDataSource(arr);
      this.ser.getAllCars().subscribe(arr=> {
        this.allCars = new MatTableDataSource(arr);
        this.ser.getAllCarTypes().subscribe(arr=> {
        this.allCarTypes = new MatTableDataSource(arr)
        this.ser.getAllOrders().subscribe(arr=> this.allOrders = new MatTableDataSource(arr));
        });
      });
    });
  }
  
  allUsers: MatTableDataSource<any>;
  allCars: MatTableDataSource<any>;
  allCarTypes: MatTableDataSource<any>;
  allOrders: MatTableDataSource<any>;

  allUsersColumns: Array<string> = Array<string>('ID', 'Full name', 'IdNumber', 'User name', 'Password', 'User type', 'Gender', 'Email', 'Birth date' , 'Photo', 'Actions');
  allCarsColumns: Array<string> = Array<string>('ID', 'Type number','KM', 'Car number', 'Is available', 'Is proper', 'Actions');
  allCarTypesColumns: Array<string> = Array<string>('ID','Maker', 'Model', 'Cost for day', 'Cost for late', 'Year', 'Gear', 'Photo', 'Actions');
  allOrdersColumns: Array<string> = Array<string>('ID', 'Car number', 'User idNumber', 'Start date', 'End date', 'Return date', 'Actions' );

  UsersFilter(filterValue: string) {
    this.allUsers.filter = filterValue.trim().toLowerCase();
  }
  CarsFilter(filterValue: string) {
    this.allCars.filter = filterValue.trim().toLowerCase();
  }
  CarTypesFilter(filterValue: string) {
    this.allCarTypes.filter = filterValue.trim().toLowerCase();
  }
  OrdersFilter(filterValue: string) {
    this.allOrders.filter = filterValue.trim().toLowerCase();
  }

  deleteFromUserDataBase(id: number){
    const dialogRef = this.dialog.open(DialogYesOrNoComponent,{data:{alertmMassege:"Are you sure you want to delete this user?"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ser.deleteUser(id).subscribe(res=>{
          this.ser.getAllUsers().subscribe(arr=> this.allUsers = new MatTableDataSource(arr));
        })
      }
    });
  }
  
  deleteFromCarDataBase(id: number){
    const dialogRef = this.dialog.open(DialogYesOrNoComponent,{data:{alertmMassege:"Are you sure you want to delete this car?"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ser.deleteCar(id).subscribe(res=>{
          this.ser.getAllCars().subscribe(arr=> this.allCars = new MatTableDataSource(arr));
          
        })
      }
    });
  }
  
  deleteFromCarTypeDataBase(id: number){
    const dialogRef = this.dialog.open(DialogYesOrNoComponent,{data:{alertmMassege:"Are you sure you want to delete this carType?"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ser.deleteCarType(id).subscribe(res=>{
          this.ser.getAllCarTypes().subscribe(arr=> this.allCarTypes = new MatTableDataSource(arr));
        })
      }  
    });
  }
  
  deleteFromOrderDataBase(id: number){
    const dialogRef = this.dialog.open(DialogYesOrNoComponent,{data:{alertmMassege:"Are you sure you want to delete this order?"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ser.deleteOrder(id).subscribe(res=>{
          this.ser.getAllOrders().subscribe(arr=> this.allOrders = new MatTableDataSource(arr));
        })
      }
    });
  }

  addOrEditUser(user:user = null){
    
    const dialogRef = this.dialog.open(UserAddOrEditComponent,{data: user})
    dialogRef.afterClosed().subscribe(result => {
          this.ser.getAllUsers().subscribe(arr=> this.allUsers = new MatTableDataSource(arr));
    });
  }

  addOrEditCar(car:car= null){
    
    const dialogRef = this.dialog.open(CarAddOrEditComponent,{data: car})
    dialogRef.afterClosed().subscribe(result => {
          this.ser.getAllCars().subscribe(arr=> this.allCars = new MatTableDataSource(arr));
    });
  }

  addOrEditCarType(carType:carType= null){
    
    const dialogRef = this.dialog.open(CarTypeAddOrEditComponent,{data: carType})
    dialogRef.afterClosed().subscribe(result => {
          this.ser.getAllCarTypes().subscribe(arr=> this.allCarTypes = new MatTableDataSource(arr));
    });
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
