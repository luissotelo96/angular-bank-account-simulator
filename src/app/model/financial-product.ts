export interface FinancialProduct {
    financialProductID: number;
    productTypeID: number;
    balance: number;
    dateInit: Date;
    customerID: number;
    productType: ProductType
    montlyInterest: number;
    financialMovements: FinancialMovement[];
}

export interface ProductType {
    productTypeID: number;
    description: string;
    montlyInterest: number;
}

export interface FinancialMovement {
    financialMovementsID: number;
    financialProductID: number;
    movementDate: Date;
    movementType: string;
    value: number;
    customerID: number;
    balance: number;
}

export interface FinancialProductReport {
    productType: string;
    documentNumber: number;
    name: string;
    phoneNumber: string;
    balance: number;
}