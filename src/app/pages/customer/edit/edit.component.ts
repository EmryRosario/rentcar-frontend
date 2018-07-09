import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  customer = {};
  constructor(public dialogRef: MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private customerApi: CustomerService,
     private alertService: AlertService) {
       this.customer = data.customer;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.customer) {
      this.customerApi.edit(this.customer)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
