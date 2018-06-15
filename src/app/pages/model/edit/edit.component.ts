import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModelService } from '../../../services/model/model.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model = {};
  constructor(public dialogRef: MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private modelApi: ModelService,
     private alertService: AlertService) {
       this.model = data.model;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.model) {
      this.modelApi.edit(this.model)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
