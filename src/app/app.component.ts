import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { AlertService } from 'ngx-alerts';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged: boolean = false;
  user = {
    username : '',
    password: ''
  }
  constructor (private auth: AuthService, private alertService: AlertService, private router: Router) {
    if (localStorage._t) {
      this.auth.isLogged()
    .then((response) => {
      this.logged = !response['error'];
    })
    .catch(() => {
      this.logged = false;
    })
    } else {
      this.logged = false;
    }
  }
  
  login (event) {
    debugger
    if (event) event.preventDefault();
    this.auth.authenticate(this.user)
    .then((user) => {
      console.log(this.user)
      if (user['token']) {
        localStorage._t = user['token'];
        
        this.router.navigate(['combustibles']);
        this.alertService.success(`Bienvenido ${user['name']} :)`);
        this.logged = !this.logged;
      } else{
        this.alertService.danger('No se ha podido iniciar sesion...');
      }
    })
    .catch ((error) => {
      console.log(error)
      this.alertService.danger('No se ha podido iniciar sesion...');
    })
  }

  logout () {
    localStorage.clear();
    this.logged = false;
    this.router.navigate(['']);
  }
}
