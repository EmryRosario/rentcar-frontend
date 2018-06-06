import { Component, OnInit, ViewChild } from '@angular/core';
import { FuelService } from '../../services/fuel/fuel.service';
import { MatTableDataSource, MatSort, MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'page-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Descripcion', 'Estado', 'Creado', 'Fecha', 'operations']  
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  currentFuel;

  constructor(private fuelApi: FuelService) {
    fuelApi.getAllFuels()
    .then(f => {
      this.dataSource = new MatTableDataSource(f as any) 
      this.dataSource.sort = this.sort;
    })
    .catch(f => console.error(f))

   }
  ngOnInit() {
    
  }

  getDate (date: string) {
    let d = new Date(date);
    let day, month, year;

    day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
    year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }
  optionsClick (fuel) {
    console.log(fuel)
  }
}
