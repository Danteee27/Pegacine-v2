import { DataSource } from 'typeorm';
import { UserTransactionEntity } from './entities/transaction.entity';

export const UserTransactionEntityProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserTransactionEntity),
    inject: ['DATA_SOURCE'],
  },
];
