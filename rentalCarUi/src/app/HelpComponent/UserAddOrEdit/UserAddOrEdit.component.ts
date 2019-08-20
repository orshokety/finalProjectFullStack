import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { user } from 'src/app/Helpers/dataHelpers';
import { ManagersService } from 'src/app/Services/managers.service';

@Component({
  selector: 'UserAddOrEditComponent',
  templateUrl: './UserAddOrEdit.component.html',
  styleUrls: ['./UserAddOrEdit.component.css']
})
export class UserAddOrEditComponent implements OnInit {

  constructor( public dialogRef:MatDialogRef<UserAddOrEditComponent> , private ser : ManagersService , public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: user) {
    debugger
  if (data.id == undefined) {
    data.fullName = ""
    data.userName = ""
    data.password = ""
    data.email = ""
    this.header = "Add User"
    this.addOrEdit = false;
  }    

  } 
  imageSrc : any;
  genders: any[] = [
    {value: 'Male'},
    {value: 'Female'},
  ];
  userTypes: any[] = [
    {value: 'Admin'},
    {value: 'Employee'},
    {value: 'Regular'},
  ];
  user : user;
  hide = true;
  header : string = "Edit User"
  addOrEdit : boolean = true ;

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

  saveChanges(idNumber: string, fullName: string, userName: string, password: string, gender: string, email: string, userType:string, date: string){
    if (this.addOrEdit) {
      this.updateAUser(idNumber,fullName,userName,password,gender,email,userType,date)
    }
    else{
      this.addAUser(idNumber,fullName,userName,password,gender,email,userType,date)
    }
  }

  addAUser(idNumber: string, fullName: string, userName: string, password: string, gender: string, email: string, userType:string, date: string){
    if (idNumber && fullName && userName && password && gender && email) {
    this.user= new user(fullName, idNumber, userName, 
      password, gender,email,new Date(date),this.imageSrc, userType, this.data.id);
      this.ser.addAUser(this.user).subscribe(res =>{this.dialogRef.close()});
    }
  }

  updateAUser(idNumber: string, fullName: string, userName: string, password: string, gender: string, email: string, userType:string, date: string){
    
    
    if (idNumber && fullName && userName && password && gender && email) {
      this.user= new user(fullName, idNumber, userName, 
        password, gender,email,new Date(date),this.imageSrc, userType, this.data.id);
        this.ser.updateAUser(this.user).subscribe(res =>{this.dialogRef.close()});
        
    }
    
  }
}
