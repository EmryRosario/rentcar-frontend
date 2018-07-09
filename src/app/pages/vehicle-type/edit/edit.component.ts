import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  vehicleType = {};
  constructor(public dialogRef: MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private vehicleTypeApi: VehicleTypeService,
     private alertService: AlertService) {
       this.vehicleType = data.vehicleType;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.vehicleType) {
      this.vehicleTypeApi.edit(this.vehicleType)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
