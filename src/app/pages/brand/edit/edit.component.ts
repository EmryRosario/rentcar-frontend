import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrandService } from '../../../services/brand/brand.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  brand = {};
  constructor(public dialogRef: MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private brandApi: BrandService,
     private alertService: AlertService) {
       this.brand = data.brand;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.brand) {
      this.brandApi.edit(this.brand)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
