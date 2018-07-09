import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'ngx-alerts';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { BrandService } from '../../../services/brand/brand.service';
import { ModelService } from '../../../services/model/model.service';
import { FuelService } from '../../../services/fuel/fuel.service';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  vehicle = {
    description: '',
    state: '',
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
 
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private vehicleApi: VehicleService,
    private alertService: AlertService,
    private brandApi: BrandService,
    private modelApi: ModelService,
    private fuelApi: FuelService,
    private vehicleTypeApi: VehicleTypeService
  ) {
       
       this.setData().then(() => {
        this.vehicle = data.vehicle;
        console.log(this.vehicle)
       })
       
      }

  ngOnInit() {
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
  save (event) {
    event.preventDefault();
    if (this.vehicle) {
      this.vehicleApi.edit(this.vehicle)
      .then(() => this.alertService.success('Guardado correctamente...'))
      .catch(() => this.alertService.danger('Ha ocurrido un error'))
      // alert('Combustible guardado correctamente.');
    }
    this.dialogRef.close();
  }
}
