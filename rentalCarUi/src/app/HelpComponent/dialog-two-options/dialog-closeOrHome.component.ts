import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RouterHelper } from 'src/app/Helpers/RouterHelper';

@Component({
  selector: 'dialogcloseOrHome',
  templateUrl: './dialog-closeOrHome.component.html',
  styleUrls: ['./dialog-closeOrHome.component.css']
})
export class dialogcloseOrHome implements OnInit {

  constructor(public dialogRef:MatDialogRef<dialogcloseOrHome>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { 

  }
  home(){
    this.router.navigateByUrl(RouterHelper.home)
    this.dialogRef.close()
  }
  close(){
    this.dialogRef.close()
  }
  ngOnInit() {
  }

}
