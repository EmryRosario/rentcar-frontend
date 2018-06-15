import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrandService } from '../../../services/brand/brand.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  brand = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private brandApi: BrandService,
     private alertService: AlertService) {
       this.brand = data.brand;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.brand) {
      this.brandApi.delete(this.brand)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.brand});
  }
}
