import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsQuery } from './get_transactions.query';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsQueryHandler
  implements IQueryHandler<GetTransactionsQuery>
{
  constructor(readonly httpService: HttpService) {}
  async execute(query: GetTransactionsQuery): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://momosv3.apimienphi.com/api/getTransHistory',
        query.dto,
      ),
    );

    const transactions = response.data.data.filter(
      (transaction) => transaction.amount === '666' || '888',
    );

    return transactions;
  }
}
