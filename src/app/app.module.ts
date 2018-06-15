import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {appRoutes} from './app-routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';

import {
  MatToolbarModule,  
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FuelComponent } from './pages/fuel/fuel.component';
import { FuelService } from './services/fuel/fuel.service';
import { CreateComponent as CreateFuelComponent } from './pages/fuel/create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditComponent as EditFuelComponent } from './pages/fuel/edit/edit.component';
import { SeeComponent as SeeFuelComponent } from './pages/fuel/see/see.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { DeleteComponent as DeleteFuelComponent } from './pages/fuel/delete/delete.component';
import { AuthService } from './services/auth/auth.service';
import { SessionGuardService } from './session-guard.service';
import { BrandService } from './services/brand/brand.service';

import { BrandComponent } from './pages/brand/brand.component';
import { CreateComponent as CreateBrandComponent } from './pages/brand/create/create.component'
import { EditComponent as EditBrandComponent } from './pages/brand/edit/edit.component';
import { SeeComponent as SeeBrandComponent } from './pages/brand/see/see.component';
import { DeleteComponent as DeleteBrandComponent } from './pages/brand/delete/delete.component';

;@NgModule({
  declarations: [
    AppComponent,
    FuelComponent,
    CreateFuelComponent,
    EditFuelComponent,
    SeeFuelComponent,
    FormatDatePipe,
    DeleteFuelComponent,
    BrandComponent,
    CreateBrandComponent,
    EditBrandComponent,
    SeeBrandComponent,
    DeleteBrandComponent
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000}),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule
  ],
  providers: [
    FuelService,
    BrandService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    FormatDatePipe,
    AuthService,
    SessionGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateFuelComponent, 
    EditFuelComponent, 
    SeeFuelComponent, 
    DeleteFuelComponent,
    BrandComponent,
    CreateBrandComponent,
    EditBrandComponent,
    SeeBrandComponent,
    DeleteBrandComponent
  ]
})
export class AppModule { }
