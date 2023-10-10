export interface Customer {
    customerID: number;
    documentNumber: string;
    name: string;
    phoneNumber: string;
    customerType: CustomerType;
    legalRepresentativeID: number;
    legalRepresentative: Customer;

}

export interface CustomerType {
    customerTypeID: number;
    description: string;
}

