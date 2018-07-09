import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'page-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(MatMenuTrigger) appMenu: MatMenuTrigger;
  columns = ['Codigo', 'Name', 'Cedula',  'CreditLimit', 'PeopleType', 'Created',  'State', 'Date', 'operations']  
  dataSource;
  customer: {};
  customers: any = [];
  @ViewChild(MatSort) sort: MatSort;
  currentcustomer;
  modalWidth: any = document.getElementsByTagName('body')[0].clientWidth * 0.7; 
  modalHeight: any = document.getElementsByTagName('body')[0].clientHeight * 0.7; 
  constructor(private customerApi: CustomerService, private dialog: MatDialog, private alertService: AlertService) {
    this.setcustomers();
  }
  ngOnInit() {
    
  }
  setcustomers () {
    this.customerApi.getAllCustomers()
    .then(f => {
      this.customers = f;
      this.customers = this.customers.filter(f => f.state != 'Eliminado')
      this.customers = this.customers.map (f => {
        console.log(f)
        if (!f.employee) f.employee = { name: ' '};
        if (!f.creditLimit) f.creditLimit = {
          '$numberDecimal': 0
        }

        return f;
      })
      this.dataSource = new MatTableDataSource(this.customers as any) 
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
  optionsClick (customer) {
    console.log(customer);
    this.customer = customer;   
  }

  createNewcustomer() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {some: 'some data'};
    dialogConfig.width = this.modalWidth;
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        console.log(customer)
        this.customerApi.save(customer.data)
        .then(() => {
          this.alertService.success('Guardado correctamente...');
          this.setcustomers();
        })
        .catch((e) => {
          console.log(e)
          this.alertService.success('Vaya, ha ocurrido un error!')
        });
      }
    });
  }

  editCustomer (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      customer: this.customer
    }
    let dialogRef = this.dialog.open(EditComponent, dialogConfig,);
    
  }
  deleteCustomer (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      customer: this.customer
    }
    let dialogRef = this.dialog.open(DeleteComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe(customer => {
      if (customer.data) {
       this.setcustomers();
      }
    });
   
  }

  see (event) {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = this.modalWidth;
    dialogConfig.data = {
      customer: this.customer
    }
    let dialogRef = this.dialog.open(SeeComponent, dialogConfig,);
  }
}
