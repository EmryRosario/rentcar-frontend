import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAllBrands() {
    return this.http.get(`${environment.api}/vehicle-brand`).toPromise() 
  }

  save(brand) {
    return this.http.post(`${environment.api}/vehicle-brand`,{
    vehicleBrand: brand,
    token: localStorage._t
    }).toPromise();
  }

  edit(brand) {
    return this.http.put(`${environment.api}/vehicle-brand/${brand._id}`,{
    update: {
      description: brand.description,
      state: brand.state
    }
  }).toPromise()
  }

  delete(brand) {
    return this.http.put(`${environment.api}/vehicle-brand/${brand._id}`,{
      update: {
        state: 'Eliminado'
      }
    }).toPromise();
  }
}
