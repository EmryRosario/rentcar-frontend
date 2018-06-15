import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelService } from '../../services/model/model.service';
import { MatTableDataSource, MatSort, MatMenuTrigger } from '@angular/material';
import {
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SeeComponent } from './see/see.component';
import { DeleteComponent } from './delete/delete.component';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'page-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Descripcion', 'Estado', 'Creado', 'Fecha', 'operations']  
  dataSource;
  model: {};
  models: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentmodel;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private modelApi: ModelService, private dialog: MatDialog, private alertService: AlertService) {
    this.setModels();
  }
  ngOnInit() {
    
  }
  setModels () {
    this.modelApi.getAllModels()
    .then(f => {
      this.models = f;
      this.models = this.models.filter(f => f.state != 'Eliminado')
      this.models = this.models.map (f => {
        if (!f.employee) f.employee = { name: ' '};
        return f;
      })
      this.dataSource = new MatTableDataSource(this.models as any) 
      this.dataSource.sort = this.sort;
    })
    .catch(f => console.error(f))
  }
  getDate (date: string) {
    let d = new Date(date);
    let day, month, year;

    day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
    year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }
  optionsClick (model) {
    console.log(model);
    this.model = model;   
  }

  createNewModel() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(model => {
      if (model) {
        this.modelApi.save(model.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setModels();
        })
        .catch((e) => {
          console.log(e)
          this.alertService.success('Vaya, ha ocurrido un error!')
        });
      }
    });
  }

  editModel (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      model: this.model
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }
  deleteModel (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      model: this.model
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(model => {
      if (model.data) {
       this.setModels();
      }
    });
   
  }

  see (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      model: this.model
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
