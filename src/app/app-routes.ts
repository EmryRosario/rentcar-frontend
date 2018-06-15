import { Routes } from '@angular/router';
import {FuelComponent} from './pages/fuel/fuel.component';
import { SessionGuardService } from './session-guard.service';
import { BrandComponent } from './pages/brand/brand.component';

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
        data: {title: 'Manejo de combustibles'},
        canActivate: [SessionGuardService]
    }
];
