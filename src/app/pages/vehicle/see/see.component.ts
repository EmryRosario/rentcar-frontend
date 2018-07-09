import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {
  vehicle = {};
  constructor(public dialogRef: MatDialogRef<SeeComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private alertService: AlertService, private formatDate: FormatDatePipe) {
       this.vehicle = data.vehicle;
      }

  ngOnInit() {
  }

  close (event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
