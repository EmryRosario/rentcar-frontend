import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLogged (token = localStorage._t) {
    return this.http.post(`${environment.api}/token`, {token})
    .toPromise();
  }

  authenticate (user) {
    return this.http.post(`${environment.api}/login`, user).toPromise();
  }
}
