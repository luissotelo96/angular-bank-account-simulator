import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FinancialProductService } from 'src/app/services/financial-product.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductType } from 'src/app/model/financial-product';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.scss']
})
export class NewProductDialogComponent implements OnInit {
  productType: ProductType[] = [];
  newProductFormGroup: FormGroup;
  selectedProductType: ProductType = {} as ProductType;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { customerId: number },
    private financialProductService: FinancialProductService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.newProductFormGroup = this.formBuilder.group({
      productTypeID: [null, Validators.required],
      montlyInterest: [null],
      balance: [null],
    });
  }

  public ngOnInit(): void {
    this.financialProductService.getProductTypes().subscribe({
      next: data => {
        this.productType = data.data;
      },
      error: err => {
        console.log("Error al obtener la información de los tipo de productos: ", err)
      }
    });
  }

  public onTypeProductChange(target: any) {
    this.selectedProductType = target.value;
  }

  public createProduct() {
    const montlyInterest = this.newProductFormGroup.get('montlyInterest').value;
    const balance = this.newProductFormGroup.get('balance').value;

    if (this.selectedProductType.productTypeID === 3 && balance === null) {
      this.openSnackBar(`El valor del monto inicial debe ser mayor a cero`);
    } else {
      let dataToSend = {
        productTypeID: this.selectedProductType.productTypeID,
        balance: balance === null ? 0 : balance,
        montlyInterest: this.selectedProductType.productTypeID === 3 ? montlyInterest : this.selectedProductType.montlyInterest,
        customerID: this.data.customerId
      };

      this.financialProductService.createFinancialProduct(dataToSend).subscribe({
        next: data => {
          if (data.isSuccess) {
            this.openDialog("¡Producto creado exitosamente!");
          }
          else {
            this.openSnackBar(`No se pudo crear el producto: ${data.message}`);
          }
        },
        error: err => {
          this.openSnackBar(`No se pudo crear el producto: ${err.error.message}`);
        }
      });
    }

  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
