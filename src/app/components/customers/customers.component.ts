import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit, AfterViewInit {
  customerList: Customer[] = [];
  displayedColumns: string[] = ['documentNumber', 'name', 'customerType', 'options'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customerList = data.data;
        this.dataSource = new MatTableDataSource(this.customerList);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log("Error al obtener la lista de clientes")
      }
    })
  }

  ngAfterViewInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}