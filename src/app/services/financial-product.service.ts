import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  constructor(private _http: HttpClient) { }

  public getFinancialProductsByIdCustomer(customerId: any) {
    const param = {
      customerId: customerId
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetFinancialProductsByCustomerID`, param);
  }

  public getProductTypes() {
    return this._http.get<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetProductTypes`);
  }

  public createFinancialProduct(data: any) {
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}CreateFinancialProduct`, data);
  }

  public withdrawMoney(data: any) {
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}WithdrawMoney`, data);
  }

  public depositMoney(data: any) {
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}DepositMoney`, data);
  }

  public getFinancialMovementsByFinancialProductId(data: any) {
    const param = {
      financialProductId: data
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetFinancialMovementsByFinancialProductId`, param);
  }

  public cancelProduct(data: any) {
    const param = {
      financialProductId: data
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}CancelProduct`, param);
  }

  public GetAverageBalanceByProductTypeId(data: any) {
    const param = {
      productTypeId: data
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetAverageBalanceByProductTypeId`, param);
  }

  public GetTopBalanceCustomers(data: any) {
    const param = {
      productTypeId: data
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetTopBalanceCustomers`, param);
  }

}
