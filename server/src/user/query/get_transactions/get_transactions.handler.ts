import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsQuery } from './get_transactions.query';
import { Inject } from '@nestjs/common';
import { UserTransactionEntity } from 'src/user/entities/transaction.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsQueryHandler
  implements IQueryHandler<GetTransactionsQuery>
{
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    readonly transactionRepository: Repository<UserTransactionEntity>,
  ) {}
  async execute(query: GetTransactionsQuery): Promise<any> {
    const transactions = await this.transactionRepository.find();

    return transactions;
  }
}
