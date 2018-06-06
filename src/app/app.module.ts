import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {appRoutes} from './app-routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatToolbarModule,  
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FuelComponent } from './pages/fuel/fuel.component';
import { FuelService } from './services/fuel/fuel.service';

@NgModule({
  declarations: [
    AppComponent,
    FuelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule
  ],
  providers: [FuelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
