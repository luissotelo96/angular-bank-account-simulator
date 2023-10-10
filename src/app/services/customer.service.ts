import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  public getCustomers() {
    return this._http.get<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetCustomers`);
  }

  public getCustomerById(customerId: number) {
    const param = {
      CustomerId: customerId
    };

    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetCustomerById`, param);
  }

  public getCustomerTypes() {
    return this._http.get<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetCustomerTypes`);
  }

  public createCustomer(data: any) {
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}CreateCustomer`, data);
  }

  public GetCustomerByDocumentNumber(documentNumber: any) {
    const param = {
      documentNumber: documentNumber
    };
    return this._http.post<ApiResponse>(`${environment.fn_bank_account_simulator_url}GetCustomerByDocumentNumber`, param);
  }

}
