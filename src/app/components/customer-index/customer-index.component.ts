import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { FinancialProductService } from 'src/app/services/financial-product.service';

@Component({
  selector: 'app-customer-index',
  templateUrl: './customer-index.component.html',
  styleUrls: ['./customer-index.component.scss']
})
export class CustomerIndexComponent {

  financialProductList: any = [];
  totalBalance: number = 0;
  customer: any = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private financialProductService: FinancialProductService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar) { }

  searchCustomerProducts(event: Event) {
    const documentNumber = (event.target as HTMLInputElement).value;
    this.customerService.GetCustomerByDocumentNumber(documentNumber).subscribe({
      next: data => {
        this.customer = data.data;
        const customerId =  this.customer.customerID;
        if (customerId) {
          this.financialProductService.getFinancialProductsByIdCustomer(customerId).subscribe({
            next: data => {
              this.financialProductList = data.data;
              this.totalBalance = this.financialProductList.reduce((total, product) => total + product.balance, 0);
            },
            error: err => {
              this.openSnackBar(`No se obtuvieron productos: ${err}`);
            }
          });
        }
      },
      error: err => {
        this.openSnackBar(`No se encontró el cliente`);
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
