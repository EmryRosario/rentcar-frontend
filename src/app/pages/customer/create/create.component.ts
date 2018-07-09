import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  customer = {
    state: 'Activo',
    name: ' '
  };

 states: [{name: 'Activo'}, {name: 'Inactivo'}];
 
  constructor( public dialogRef: MatDialogRef<CreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
   }

  ngOnInit() {
  }
  closeDialog() {
  }
  openDialog() {

  }
  save (event) {
    console.log(this.customer);
    event.preventDefault();
    this.dialogRef.close({data: this.customer});
  }
}
