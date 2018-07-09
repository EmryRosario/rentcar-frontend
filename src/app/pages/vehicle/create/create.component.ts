import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BrandService } from '../../../services/brand/brand.service';
import { ModelService } from '../../../services/model/model.service';
import { FuelService } from '../../../services/fuel/fuel.service';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  vehicle = {
    description: '',
    state: 'Activo',
    chasis: '',
    engine: '',
    placa: '',
    vehicleType: '',
    color: '',
    brand: '',
    model: '',
    fuel: '',

 };
 brands = [];
 models = [];
 fuels = [];
 vehicleTypes = [];

 states: [{name: 'Activo'}, {name: 'Inactivo'}];
 
  constructor( public dialogRef: MatDialogRef<CreateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private brandApi: BrandService,
    private modelApi: ModelService,
    private fuelApi: FuelService,
    private vehicleTypeApi: VehicleTypeService  
  ) {
    console.log(data)
    this.setData();
   }

   async setData () {
    await this.setbrands();
    await this.setModels();
    await this.setFuels();
    await this.setvehicleTypes();
   }

  setbrands () {
  return new Promise ((resolve, reject) => {
      this.brandApi.getAllBrands()
      .then(f => {
        this.brands = f as any;
        console.log(this.brands);
        resolve()
      })
      .catch(f => {
        console.error(f)
        reject()
      })
  })
  }

  setModels () {
    return new Promise((resolve, reject) => {
      this.modelApi.getAllModels()
    .then(f => {
      this.models = f as any;
      console.log(this.models)
      resolve()
    })
    .catch(f => {
      console.error(f);
      reject();
    })
    })
  }

  setFuels () {
    return new Promise((resolve, reject) => {
      this.fuelApi.getAllFuels()
      .then(f => {
        this.fuels = f as any;
        resolve();
      })
      .catch(f => {
        console.error(f)
        reject();
      })
    })
  }

  setvehicleTypes () {
    return new Promise((resolve, reject) => {
      this.vehicleTypeApi.getAllVehicleTypes()
    .then(f => {
      this.vehicleTypes = f as any;
      console.log(this.vehicleTypes);
      resolve();
    })
    .catch(f => {
      console.error(f);
      reject();
    })
    })
  }

  ngOnInit() {
  }
  closeDialog() {
  }
  openDialog() {

  }
  save (event) {
    event.preventDefault();
    this.dialogRef.close({data: this.vehicle});
  }
}
