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

import { ModelComponent } from './pages/model/model.component';
import { CreateComponent as CreateModelComponent } from './pages/model/create/create.component'
import { EditComponent as EditModelComponent } from './pages/model/edit/edit.component';
import { SeeComponent as SeeModelComponent } from './pages/model/see/see.component';
import { DeleteComponent as DeleteModelComponent } from './pages/model/delete/delete.component';

import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { CreateComponent as CreateVehicleComponent } from './pages/vehicle/create/create.component'
import { EditComponent as EditVehicleComponent } from './pages/vehicle/edit/edit.component';
import { SeeComponent as SeeVehicleComponent } from './pages/vehicle/see/see.component';
import { DeleteComponent as DeleteVehicleComponent } from './pages/vehicle/delete/delete.component';

import { VehicleTypeComponent } from './pages/vehicle-type/vehicle-type.component';
import { CreateComponent as CreateVehicleTypeComponent } from './pages/vehicle-type/create/create.component'
import { EditComponent as EditVehicleTypeComponent } from './pages/vehicle-type/edit/edit.component';
import { SeeComponent as SeeVehicleTypeComponent } from './pages/vehicle-type/see/see.component';
import { DeleteComponent as DeleteVehicleTypeComponent } from './pages/vehicle-type/delete/delete.component';

import { CheckEmptyPipe } from './pipes/check-empty.pipe';

import { CustomerComponent } from './pages/customer/customer.component';
import { CreateComponent as CreateCustomerComponent } from './pages/customer/create/create.component'
import { EditComponent as EditCustomerComponent } from './pages/customer/edit/edit.component';
import { SeeComponent as SeeCustomerComponent } from './pages/customer/see/see.component';
import { DeleteComponent as DeleteCustomerComponent } from './pages/customer/delete/delete.component';

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
    DeleteBrandComponent,
    ModelComponent,
    CreateModelComponent,
    EditModelComponent,
    SeeModelComponent,
    DeleteModelComponent,
    VehicleComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    SeeVehicleComponent,
    DeleteVehicleComponent,
    VehicleTypeComponent,
    CreateVehicleTypeComponent,
    EditVehicleTypeComponent,
    SeeVehicleTypeComponent,
    DeleteVehicleTypeComponent,
    CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    SeeCustomerComponent,
    DeleteCustomerComponent,
    CheckEmptyPipe
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
    DeleteBrandComponent,
    ModelComponent,
    CreateModelComponent,
    EditModelComponent,
    SeeModelComponent,
    DeleteModelComponent,
    VehicleComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    SeeVehicleComponent,
    DeleteVehicleComponent,
    VehicleTypeComponent,
    CreateVehicleTypeComponent,
    EditVehicleTypeComponent,
    SeeVehicleTypeComponent,
    DeleteVehicleTypeComponent,
    CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    SeeCustomerComponent,
    DeleteCustomerComponent
  ]
})
export class AppModule { }
