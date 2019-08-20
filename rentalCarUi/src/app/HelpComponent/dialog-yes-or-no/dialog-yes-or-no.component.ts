import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-yes-or-no',
  templateUrl: './dialog-yes-or-no.component.html',
  styleUrls: ['./dialog-yes-or-no.component.css']
})
export class DialogYesOrNoComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DialogYesOrNoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { 

  }

  yesOrNo(bool:boolean){
    if (bool) {
      this.dialogRef.close(true);
    }
    else{
      this.dialogRef.close(false);
    }
  }

  ngOnInit() {
  }

}
