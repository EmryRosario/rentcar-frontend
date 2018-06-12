import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private http: HttpClient) { }

  getAllFuels() {
    return new Promise ((resolve, reject) => {
      let request = this.http.get(`${environment.api}/fuel-type`)
      .subscribe(fuels => {
        resolve(fuels)
        request.unsubscribe()        
      }, error => {
        reject(error)
        request.unsubscribe()        
      })
    }) 
  }

  save(fuel) {
    return new Promise ((resolve, reject) => {
      let request = this.http.post(`${environment.api}/fuel-type`,{
        fuelType: fuel
      })
      .subscribe(saved => {
        resolve(saved)
        request.unsubscribe()        
      }, error => {
        reject(error)
        request.unsubscribe()        
      })
    }) 
  }

  edit(fuel) {
    return new Promise ((resolve, reject) => {
      let request = this.http.put(`${environment.api}/fuel-type/${fuel._id}`,{
        update: {
          description: fuel.description,
          state: fuel.state
        }
      })
      .subscribe(saved => {
        resolve(saved)
        request.unsubscribe()        
      }, error => {
        reject(error)
        request.unsubscribe()        
      })
    }) 
  }

  delete(fuel) {
    return new Promise ((resolve, reject) => {
      let request = this.http.put(`${environment.api}/fuel-type/${fuel._id}`,{
        update: {
          state: 'Eliminado'
        }
      })
      .subscribe(saved => {
        resolve(saved)
        request.unsubscribe()        
      }, error => {
        reject(error)
        request.unsubscribe()        
      })
    }) 
  }
}
