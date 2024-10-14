import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'jsonb' })
  owner: {
    id: number;
    name: string;
  };

  @Column({ type: 'varchar', length: 100 })
  kind: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  salesChannel: string;

  @Column({ type: 'jsonb' })
  plan: {
    id: number;
    name: string;
  };

  @Column({ type: 'jsonb' })
  paymentDetails: {
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

  @Column({ type: 'jsonb' })
  paymentMethod: {
    kind: string;
  };

  @Column({ type: 'jsonb' })
  billingDetails: {
    documentNumber: string;
    legalName: string;
    address: {
      street: string;
      number: string;
      postalCode: string;
      state: string;
      city: string;
      neighborhood: string;
      country: string;
    };
  };
}
