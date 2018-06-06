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
}
