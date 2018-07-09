import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get(`${environment.api}/vehicle`).toPromise() 
  }

  save(vehicle) {
    return this.http.post(`${environment.api}/vehicle`,{
    vehicle: vehicle,
    token: localStorage._t
    }).toPromise();
  }

  edit(vehicle) {
    return this.http.put(`${environment.api}/vehicle/${vehicle._id}`,{
    update: {
      description: vehicle.description,
      state: vehicle.state
    }
  }).toPromise()
  }

  delete(vehicle) {
    return this.http.put(`${environment.api}/vehicle/${vehicle._id}`,{
      update: {
        state: 'Eliminado'
      }
    }).toPromise();
  }
}
