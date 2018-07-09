import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  vehicleType = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private vehicleTypeApi: VehicleTypeService,
     private alertService: AlertService) {
       this.vehicleType = data.vehicleType;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.vehicleType) {
      this.vehicleTypeApi.delete(this.vehicleType)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.vehicleType});
  }
}
