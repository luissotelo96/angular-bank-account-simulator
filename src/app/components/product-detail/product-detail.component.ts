import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProductService } from 'src/app/services/financial-product.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  financialProduct: any;
  displayedColumns: string[] = ['movementDate', 'value', 'movementType'];
  dataSource: any;
  actionFormGroup: FormGroup;
  selectedAction: number;
  value: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private financialProductService: FinancialProductService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) {

    this.actionFormGroup = this.formBuilder.group({
      selectedAction: [],
      value: [0]
    });

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const financialProductId = params['financialProductId'];

      this.financialProductService.getFinancialMovementsByFinancialProductId(financialProductId).subscribe({
        next: data => {
          console.log(data);
          this.financialProduct = data.data;
          this.dataSource = new MatTableDataSource(this.financialProduct.financialMovements);
          this.dataSource.paginator = this.paginator;
        },
        error: err => {
          console.log("Error al obtener la información de los productos: ", err);
        }
      });
    });
  }

  public makeTransaction() {
    const actionFormData = this.actionFormGroup.value;
    console.log(actionFormData);
    const dataToSend = {
      financialProductId: this.financialProduct.financialProductID,
      value: actionFormData.value
    };

    console.log(dataToSend);

    if (actionFormData.selectedAction === 1) {
      this.financialProductService.depositMoney(dataToSend).subscribe({
        next: data => {
          this.openDialog("¡Transacción realizada exitosamente!");
        },
        error: err => {
          this.openSnackBar(`Hubo un error al realizar la transacción${err.message}`);
        }
      });
    }
    else if (actionFormData.selectedAction === 2) {
      this.financialProductService.withdrawMoney(dataToSend).subscribe({
        next: data => {
          this.openDialog("¡Transacción realizada exitosamente!");
        },
        error: err => {
          this.openSnackBar(`Hubo un error al realizar la transacción${err.message}`);
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
      //this.router.navigate['customer'];
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
