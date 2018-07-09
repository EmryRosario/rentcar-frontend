import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getAllModels() {
    return this.http.get(`${environment.api}/vehicle-model`).toPromise() 
  }

  save(model) {
    return this.http.post(`${environment.api}/vehicle-model`,{
    vehicleModel: model,
    token: localStorage._t
    }).toPromise();
  }

  edit(model) {
    return this.http.put(`${environment.api}/vehicle-model/${model._id}`,{
    update: {
      description: model.description,
      state: model.state
    }
  }).toPromise()
  }

  delete(model) {
    return this.http.put(`${environment.api}/vehicle-model/${model._id}`,{
      update: {
        state: 'Eliminado'
      }
    }).toPromise();
  }
}
