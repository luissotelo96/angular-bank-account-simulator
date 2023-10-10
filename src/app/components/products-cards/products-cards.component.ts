import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FinancialProductService } from 'src/app/services/financial-product.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FinancialProduct } from 'src/app/model/financial-product';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent {
  @Input() financialProducts: FinancialProduct[] = [];
  @Input() totalBalance: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private financialProductService: FinancialProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }

  cancelProduct(financialProductId: any) {
    this.financialProductService.cancelProduct(financialProductId).subscribe({
      next: data => {
        if(data.isSuccess)
          this.openDialog("¡Transacción realizada exitosamente!");
        else
        this.openDialog(`Hubo un error al realizar la transacción: ${data.message}`);
      },
      error: err => {
        this.openSnackBar(`Hubo un error al realizar la transacción${err.error.message}`);
      }
    })
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
