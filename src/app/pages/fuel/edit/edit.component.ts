import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FuelService } from '../../../services/fuel/fuel.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fuel = {};
  constructor(public dialogRef: MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private fuelApi: FuelService,
     private alertService: AlertService) {
       this.fuel = data.fuel;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.fuel) {
      this.fuelApi.edit(this.fuel)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
