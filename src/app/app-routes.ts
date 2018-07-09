import { Routes } from '@angular/router';
import {FuelComponent} from './pages/fuel/fuel.component';
import { SessionGuardService } from './session-guard.service';
import { BrandComponent } from './pages/brand/brand.component';
import { ModelComponent } from './pages/model/model.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehicleTypeComponent } from './pages/vehicle-type/vehicle-type.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const appRoutes: Routes = [
    { 
        path: 'combustibles', 
        component: FuelComponent,
        data: {title: 'Manejo de combustibles'},
        canActivate: [SessionGuardService]
    },

    { 
        path: 'vehiculo-marca', 
        component: BrandComponent,
        data: {title: 'Manejo de Vehiculos Marcas'},
        canActivate: [SessionGuardService]
    },
    { 
        path: 'vehiculo-modelo', 
        component: ModelComponent,
        data: {title: 'Manejo de Vehiculos Modelos'},
        canActivate: [SessionGuardService]
    },
    { 
        path: 'vehiculo', 
        component: VehicleComponent,
        data: {title: 'Manejo de Vehiculos'},
        canActivate: [SessionGuardService]
    },
    { 
        path: 'vehiculo-tipo', 
        component: VehicleTypeComponent,
        data: {title: 'Manejo de Vehiculos'},
        canActivate: [SessionGuardService]
    },
    { 
        path: 'clientes', 
        component: CustomerComponent,
        data: {title: 'Manejo de clientes'},
        canActivate: [SessionGuardService]
    }
];
