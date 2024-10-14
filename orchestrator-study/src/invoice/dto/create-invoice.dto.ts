export class CreateInvoiceDto {
  readonly repeat: string;
  readonly amount: number;
  readonly date: Date;
  readonly status: string;
  readonly salesChannel: string;
  readonly plan: {
    id: number;
    name: string;
  };
  readonly paymentDetails: {
    amount: number;
    discount: number;
    tax: number;
    total: number;
    kind: string;
    date: Date;
    bank: string;
    country: string;
    IBAN: string;
    codigo: string;
  };
  readonly paymentMethod: {
    kind: string;
  };
  readonly billingDetails: {
    documentNumber: string;
    legalName: string;
  };
  readonly owner: {
    id: number;
    name: string;
  };
  readonly kind: string;
  readonly name: string;
  readonly state: string;
  readonly id: string;
}
