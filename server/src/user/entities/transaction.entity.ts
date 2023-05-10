import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class UserTransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @Column()
  user_id: number;

  @Column()
  transaction_type: string;

  @Column()
  transaction_amount: number;

  @Column('datetime')
  transaction_date: Date;

  @Column()
  transaction_status: string;
}
