import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FinancialProductService } from 'src/app/services/financial-product.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent {
  @Input() financialProducts: any = [];
  @Input() totalBalance: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private financialProductService: FinancialProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }

  cancelProduct(financialProductId: any) {
    console.log(financialProductId);
    this.financialProductService.cancelProduct(financialProductId).subscribe({
      next: data => {
        this.openDialog("¡Transacción realizada exitosamente!");
      },
      error: err => {
        this.openSnackBar(`Hubo un error al realizar la transacción${err.message}`);
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
