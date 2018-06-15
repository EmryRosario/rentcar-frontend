import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../../services/brand/brand.service';
import { MatTableDataSource, MatSort, MatMenuTrigger } from '@angular/material';
import {
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SeeComponent } from './see/see.component';
import { DeleteComponent } from './delete/delete.component';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'page-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Descripcion', 'Estado', 'Creado', 'Fecha', 'operations']  
  dataSource;
  brand: {};
  brands: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentbrand;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private brandApi: BrandService, private dialog: MatDialog, private alertService: AlertService) {
    this.setbrands();
  }
  ngOnInit() {
    
  }
  setbrands () {
    this.brandApi.getAllBrands()
    .then(f => {
      this.brands = f;
      this.brands = this.brands.filter(f => f.state != 'Eliminado')
      this.brands = this.brands.map (f => {
        if (!f.employee) f.employee = { name: ' '};
        return f;
      })
      this.dataSource = new MatTableDataSource(this.brands as any) 
      this.dataSource.sort = this.sort;
    })
    .catch(f => console.error(f))
  }
  getDate (date: string) {
    let d = new Date(date);
    let day, month, year;

    day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
    year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }
  optionsClick (brand) {
    console.log(brand);
    this.brand = brand;   
  }

  createNewbrand() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(brand => {
      if (brand) {
        this.brandApi.save(brand.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setbrands();
        })
        .catch(() => this.alertService.success('Vaya, ha ocurrido un error!'));
      }
    });
  }

  editbrand (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      brand: this.brand
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }
  deletebrand (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      brand: this.brand
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(brand => {
      if (brand.data) {
       this.setbrands();
      }
    });
   
  }

  see (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      brand: this.brand
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
