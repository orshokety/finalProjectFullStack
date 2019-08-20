import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './Components/login/login.component';
import { Router } from '@angular/router';
import { RouterHelper } from './Helpers/RouterHelper';
import { UsersService } from './Services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentalCarUi';
  nameAndPicbool : boolean = false ;
  nameAndPic : Array<string> = new Array<string>();
  isManagerBool : boolean = false
  isEmployeeBool : boolean = false
  
  
  ngOnInit(){
    if (localStorage.getItem("token")) {
      this.userSer.getNameAndPic(localStorage.getItem("token")).subscribe(res=> {
        this.nameAndPic = res
        if (this.nameAndPic[0]!='') {
          this.nameAndPicbool = true
        }
      })
      this.isManagerOrEmployee()
    }

  }
  isManagerOrEmployee(){
  this.userSer.postUserType().subscribe(type => {
    if ( type=="Admin" ) {
      this.isManagerBool = true
      this.isEmployeeBool=true
    }
    else if ( type=="Employee" ) {
      this.isEmployeeBool = true
    }
  })
  }

  constructor(public dialog: MatDialog, private router : Router, private userSer : UsersService){
    
  }
  
  logIn(){
    const dialogRef = this.dialog.open(LoginComponent,{});

    dialogRef.afterClosed().subscribe(result => {
      this.nameAndPic = result;
      if (this.nameAndPic[0]!='') {
        this.nameAndPicbool = true
      }
      this.isManagerOrEmployee()
    });
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl(RouterHelper.home)
    this.nameAndPicbool = false;
    this.isManagerBool = false;
    this.isEmployeeBool = false;
  }

  isLogedIn():boolean{
    if (localStorage.getItem("token")==null) {
      return false
    }
    return true
    
  }

}
