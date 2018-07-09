import { Injectable } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService implements CanActivate {
  logged: boolean = false;
  constructor(private auth: AuthService) {
    this.logged = false;
    if (localStorage._t) {
      console.log('asdasdsdas')
      
      this.auth.isLogged(localStorage._t)
      .then((response) => {
        console.log(response)
        this.logged = !!response;
      })
      .catch((err) => {
        this.logged = false;
      })
    }
  }
  ngOnChanges() {
    
  }
  canActivate () {
    return this.logged;
  }
}
