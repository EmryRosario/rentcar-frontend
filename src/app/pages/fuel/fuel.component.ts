import { Component, OnInit, ViewChild } from '@angular/core';
import { FuelService } from '../../services/fuel/fuel.service';
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
  selector: 'page-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Descripcion', 'Estado', 'Creado', 'Fecha', 'operations']  
  dataSource;
  fuel: {};
  fuels: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentFuel;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private fuelApi: FuelService, private dialog: MatDialog, private alertService: AlertService) {
    this.setFuels();
  }
  ngOnInit() {
    
  }
  setFuels () {
    this.fuelApi.getAllFuels()
    .then(f => {
      this.fuels = f;
      this.fuels = this.fuels.filter(f => f.state != 'Eliminado')
      this.fuels = this.fuels.map (f => {
        if (!f.employee) f.employee = { name: ' '};
        return f;
      })
      this.dataSource = new MatTableDataSource(this.fuels as any) 
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
  optionsClick (fuel) {
    console.log(fuel);
    this.fuel = fuel;   
  }

  createNewFuel() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(fuel => {
      if (fuel) {
        this.fuelApi.save(fuel.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setFuels();
        })
        .catch(() => this.alertService.success('Vaya, ha ocurrido un error!'));
      }
    });
  }

  editFuel (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      fuel: this.fuel
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }
  deleteFuel (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      fuel: this.fuel
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(fuel => {
      if (fuel.data) {
       this.setFuels();
      }
    });
   
  }

  seeFuel (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      fuel: this.fuel
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
