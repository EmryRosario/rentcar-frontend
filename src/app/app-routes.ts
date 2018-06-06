import { Routes } from '@angular/router';
import {FuelComponent} from './pages/fuel/fuel.component';

export const appRoutes: Routes = [
    { 
        path: 'combustibles', 
        component: FuelComponent,
        data: {title: 'Manejo de combustibles'}
    }
];
