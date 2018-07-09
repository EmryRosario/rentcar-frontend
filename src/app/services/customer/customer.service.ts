import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(`${environment.api}/customer`).toPromise() 
  }

  save(customer) {
    return this.http.post(`${environment.api}/customer`,{
    customer,
    token: localStorage._t
    }).toPromise();
  }

  edit(customer) {
    console.log(customer);
    return this.http.put(`${environment.api}/customer/${customer._id}`,{
    update: {
      description: customer.description,
      state: customer.state
    }
  }).toPromise()
  }

  delete(customer) {
    return this.http.put(`${environment.api}/customer/${customer._id}`,{
      update: {
        state: 'Eliminado'
      }
    }).toPromise();
  }
}
