import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FinancialProductService } from 'src/app/services/financial-product.service';
import { NewProductDialogComponent } from '../new-product-dialog/new-product-dialog.component';
import { Customer } from 'src/app/model/customer';
import { FinancialProduct } from 'src/app/model/financial-product';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customerInfo: Customer = {} as Customer;
  financialProducts: FinancialProduct[] = [];
  totalBalance: number = 0;

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private financialProductService: FinancialProductService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const customerId = params['customerid'];

      this.customerService.getCustomerById(customerId).subscribe({
        next: data => {
          this.customerInfo = data.data;          
        },
        error: err => {
          console.log("Error al obtener la información del cliente: ", err);
        }
      });

      this.financialProductService.getFinancialProductsByIdCustomer(customerId).subscribe({
        next: data => {
          this.financialProducts = data.data;
          this.totalBalance = this.financialProducts.reduce((total, product) => total + product.balance, 0);
        },
        error: err => {
          console.log("Error al obtener la información de los productos: ", err);
        }
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewProductDialogComponent, {
      data: {
        customerId: this.customerInfo.customerID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
