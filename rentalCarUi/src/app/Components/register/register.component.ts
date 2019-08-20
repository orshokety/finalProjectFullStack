import { Component, OnInit } from '@angular/core';
import { user } from '../../Helpers/dataHelpers';
import { FormBuilder, FormGroup} from '@angular/forms'
import { MatDialog ,MatSnackBar, MatSnackBarConfig} from '@angular/material/';
import { dialogcloseOrHome } from 'src/app/HelpComponent/dialog-two-options/dialog-closeOrHome.component';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm : FormGroup;
  imageSrc:any;
  genders: any[] = [
    {value: 'Male'},
    {value: 'Female'},
  ];
  user : user;
  hide = true;
  constructor( private ser : UsersService , private fb : FormBuilder, public dialog: MatDialog, private router :Router, private registerError: MatSnackBar) { }

  ngOnInit() {
    this.userForm=this.fb.group({
      idNumber:'',
      fullName:'',
      userName:'',
      password:'',
      gender:'',
      email:'',
      birthDate:''
    })
   
     
  }
  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {this.imageSrc = reader.result;}
    }
  }
  

  submitNewUser(date:string){
    if (this.userForm.value.fullName && this.userForm.value.idNumber && this.userForm.value.userName && this.userForm.value.password && this.userForm.value.gender && this.userForm.value.email) {
      this.user= new user(this.userForm.value.fullName, this.userForm.value.idNumber, this.userForm.value.userName, 
        this.userForm.value.password, this.userForm.value.gender,this.userForm.value.email,new Date(date),this.imageSrc);
        this.ser.postRegister(this.user).subscribe(res =>{this.openDialog();});
    }
    
    else{
      this.registerError.open("Please enter all the required parametters!", "", {
        duration: 2000,
      });
    }
  }
  mat : MatSnackBarConfig

  openDialog() {
    const dialogRef = this.dialog.open(dialogcloseOrHome,{data:{alertmMassege:"Register Complete"}});

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  


}


