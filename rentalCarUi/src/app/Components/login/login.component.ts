import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : string;
  password : string;
  loginForm : FormGroup;
  Token: any;
  error: string;
  hide = true;
  nameAndPic : Array<string> = new Array<string>();
  constructor(private ser:UsersService, public dialogRef:MatDialogRef<LoginComponent>,private fb : FormBuilder ,  private router:Router) {
    
  }

  ngOnInit() {
  this.loginForm=this.fb.group({
    userName:'',
    password:''
  })
  }
 

  loginButton(){
    this.ser.postLogin(this.loginForm.value.userName,this.loginForm.value.password).subscribe(t => {
    this.Token = t;
    localStorage.setItem('token',this.Token);
    this.ser.getNameAndPic(this.Token).subscribe(res=>{
         this.nameAndPic = res;
         this.dialogRef.close(res);
        }
      )

    
    },error=>{this.error="User name or password incorrect"});
  }
  goToRegister(){
    this.dialogRef.close()
    this.router.navigateByUrl('/register')
  }
}
