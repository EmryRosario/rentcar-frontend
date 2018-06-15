import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModelService } from '../../../services/model/model.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  model = {};
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private modelApi: ModelService,
     private alertService: AlertService) {
       this.model = data.model;
      }

  ngOnInit() {
  }

  save (event) {
    event.preventDefault();
    if (this.model) {
      this.modelApi.delete(this.model)
      .then(() => this.alertService.success('Eliminado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error!'))
    }
    this.dialogRef.close({data: this.model});
  }
}
