import { Component, OnInit, ViewChild } from '@angular/core';
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
import {VehicleService} from '../../services/vehicle/vehicle.service';
import { BrandService } from '../../services/brand/brand.service';
@Component({
  selector: 'page-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo',
   'Chasis',
    'Descripcion',
    'Color',
    'Marca',
    'Modelo',
    'Estado',
    'Creado',
    'Fecha',
    'operations'
  ]  
  dataSource;
  vehicle: {};
  vehicles: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentvehicle;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private vehicleApi: VehicleService, private dialog: MatDialog, private alertService: AlertService) {
    this.setVehicles();
  }
  ngOnInit() {
    
  }
  setVehicles () {
    this.vehicleApi.getAllVehicles()
    .then(f => {
      this.vehicles = f;
      this.vehicles = this.vehicles.filter(f => f.state != 'Eliminado')
      this.vehicles = this.vehicles.map (f => {

        for (let key of Object.keys(f)) {
          if (!f[key]) {
            f[key] = {};
          }
        }
        return f;
      })
      this.dataSource = new MatTableDataSource(this.vehicles as any) 
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
  optionsClick (vehicle) {
    console.log(vehicle);
    this.vehicle = vehicle;   
  }

  createNewvehicle() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(vehicle => {
      if (vehicle) {
        this.vehicleApi.save(vehicle.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setVehicles();
        })
        .catch((e) => {
          console.log(e)
          this.alertService.success('Vaya, ha ocurrido un error!')
        });
      }
    });
  }

  editVehicle (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      vehicle: this.vehicle
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }

  

  deleteVehicle (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      vehicle: this.vehicle
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(vehicle => {
      if (vehicle.data) {
       this.setVehicles();
      }
    });
   
  }

  see (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      vehicle: this.vehicle
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
