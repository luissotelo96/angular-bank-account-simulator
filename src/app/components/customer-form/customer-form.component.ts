import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerFormGroup: FormGroup;
  customerTypes: any = [];
  isEnterpriseCustomer: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private builder: FormBuilder,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.customerFormGroup = this.builder.group({
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      customerType: [, Validators.required],
      phoneNumber: ['', Validators.required],
      legalRepresentative: this.builder.group({
        documentNumber: [''],
        name: [''],
        phoneNumber: [''],
        customerType: [{ customerTypeID: 3 }]
      })
    });
  }

  ngOnInit(): void {
    this.customerService.getCustomerTypes().subscribe({
      next: data => {
        this.customerTypes = data.data;
      },
      error: err => {
        console.log("Hubo un error al obtener los tipos de clientes", err);
      }
    });

    this.customerFormGroup.get('customerType')?.valueChanges.subscribe((value) => {
      this.validateLegalRepresentativeValidator(value.customerTypeID);
    });
  }

  public createCustomer() {
    if (!this.customerFormGroup.valid) {
      this.openSnackBar("Favor, completa los campos requeridos");
    }
    else {
      const dataToSend = this.customerFormGroup.value;
      if (!this.isEnterpriseCustomer) {
        delete dataToSend.legalRepresentative;
      }

      this.customerService.createCustomer(dataToSend).subscribe({
        next: data => {
          if (data.isSuccess) {
            this.openDialog("¡Cliente creado exitosamente!");            
          } else {
            this.openSnackBar(`Hubo un error al crear el cliente${data.message}`);
          }
        },
        error: err => {
          this.openSnackBar(`Hubo un error al crear el cliente${err.error.message}`);
        }
      });
    }

  }

  public onCustomerTypeChange(target: any) {
    const customerType = target.value;
    if (customerType.customerTypeID === 2) {
      this.isEnterpriseCustomer = true;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  validateLegalRepresentativeValidator(customerTypeID: any) {

    const documentNumberControl = this.customerFormGroup.get('legalRepresentative.documentNumber');
    const nameControl = this.customerFormGroup.get('legalRepresentative.name');
    const phoneNumberControl = this.customerFormGroup.get('legalRepresentative.phoneNumber');

    if (customerTypeID === 2) {
      documentNumberControl.setValidators(Validators.required);
      nameControl.setValidators(Validators.required);
      phoneNumberControl.setValidators(Validators.required);
    }
    else {
      documentNumberControl.clearValidators();
      nameControl.clearValidators();
      phoneNumberControl.clearValidators();
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
}
