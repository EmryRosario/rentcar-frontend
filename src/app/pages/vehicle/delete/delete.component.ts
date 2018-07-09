import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { VehicleService } from '../../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  vehicle = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private vehicleApi: VehicleService,
     private alertService: AlertService) {
       this.vehicle = data.vehicle;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.vehicle) {
      this.vehicleApi.delete(this.vehicle)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.vehicle});
  }
}
