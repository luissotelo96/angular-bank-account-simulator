import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialProductReport, ProductType } from 'src/app/model/financial-product';
import { FinancialProductService } from 'src/app/services/financial-product.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  productTypes: ProductType[] = [];
  reportInfo: FinancialProductReport[] = [];
  displayedColumns: string[] = ['productType', 'documentNumber', 'name', 'phoneNumber', 'balance'];
  dataSource: any;
  reportFilterFormGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private financialProductService: FinancialProductService) {
    this.reportFilterFormGroup = this.formBuilder.group({
      productType: [],
      reportType: []
    });
  }

  ngOnInit(): void {
    this.financialProductService.getProductTypes().subscribe({
      next: data => {
        this.productTypes = data.data;
      },
      error: err => {
        console.log("Error al obtener los tipos de productos");
      }
    })
  }

  public generateReport() {
    const formValues = this.reportFilterFormGroup.value;

    switch (formValues.reportType) {
      case 1: //Saldo promedio
        this.financialProductService.GetAverageBalanceByProductTypeId(formValues.productType.productTypeID).subscribe({
          next: data => {
            this.reportInfo = data.data;
            this.dataSource = new MatTableDataSource(this.reportInfo);
            this.dataSource.paginator = this.paginator;
          }
        });
        break;
      case 2: //Top saldo
        this.financialProductService.GetTopBalanceCustomers(formValues.productType.productTypeID).subscribe({
          next: data => {
            this.reportInfo = data.data;
            this.dataSource = new MatTableDataSource(this.reportInfo);
            this.dataSource.paginator = this.paginator;
          }
        });
        break;
      default:
        break;

    }
  }
}
