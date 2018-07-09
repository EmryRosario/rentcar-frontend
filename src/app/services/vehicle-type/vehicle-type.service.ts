import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http: HttpClient) { }

  getAllVehicleTypes() {
    return this.http.get(`${environment.api}/vehicle-type`).toPromise() 
  }

  save(vehicleType) {
    return this.http.post(`${environment.api}/vehicle-type`,{
    vehicleType,
    token: localStorage._t
    }).toPromise();
  }

  edit(type) {
    return this.http.put(`${environment.api}/vehicle-type/${type._id}`,{
    update: {
      description: type.description,
      state: type.state
    }
  }).toPromise()
  }

  delete(type) {
    return this.http.put(`${environment.api}/vehicle-type/${type._id}`,{
      update: {
        state: 'Eliminado'
      }
    }).toPromise();
  }
}
