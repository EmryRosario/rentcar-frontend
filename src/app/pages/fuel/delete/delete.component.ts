import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FuelService } from '../../../services/fuel/fuel.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  fuel = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private fuelApi: FuelService,
     private alertService: AlertService) {
       this.fuel = data.fuel;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.fuel) {
      this.fuelApi.delete(this.fuel)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.fuel});
  }
}
