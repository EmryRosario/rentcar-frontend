import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  customer = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private customerApi: CustomerService,
     private alertService: AlertService) {
       this.customer = data.customer;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.customer) {
      this.customerApi.delete(this.customer)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.customer});
  }
}
