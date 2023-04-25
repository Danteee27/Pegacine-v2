import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class UserTransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column()
  user_id: number;

  @Column()
  transaction_type: string;

  @Column()
  transaction_amount: number;

  @Column()
  transaction_date: Date;

  @Column()
  transaction_status: string;

  @Column()
  transaction_description: string;
}
