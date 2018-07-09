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
import { VehicleTypeService } from '../../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'page-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Descripcion', 'Estado', 'Creado', 'Fecha', 'operations']  
  dataSource;
  vehicleType: {};
  vehicleTypes: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentmodel;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private vehicleTypeApi: VehicleTypeService, private dialog: MatDialog, private alertService: AlertService) {
    this.setvehicleTypes();
  }
  ngOnInit() {
    
  }
  setvehicleTypes () {
    this.vehicleTypeApi.getAllVehicleTypes()
    .then(f => {
      this.vehicleTypes = f;
      this.vehicleTypes = this.vehicleTypes.filter(f => f.state != 'Eliminado')
      this.vehicleTypes = this.vehicleTypes.map (f => {
        if (!f.employee) f.employee = { name: ' '};
        return f;
      })
      this.dataSource = new MatTableDataSource(this.vehicleTypes as any) 
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
  optionsClick (vehicleType) {
    console.log(vehicleType);
    this.vehicleType = vehicleType;   
  }

  createNewVehicleType() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(model => {
      if (model) {
        this.vehicleTypeApi.save(model.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setvehicleTypes();
        })
        .catch((e) => {
          console.log(e)
          this.alertService.success('Vaya, ha ocurrido un error!')
        });
      }
    });
  }

  editVehicleType (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      vehicleType: this.vehicleType
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }
  deleteVehicleType (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      vehicleType: this.vehicleType
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(vehicleType => {
      if (vehicleType.data) {
       this.setvehicleTypes();
      }
    });
   
  }

  see (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      model: this.vehicleType
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
