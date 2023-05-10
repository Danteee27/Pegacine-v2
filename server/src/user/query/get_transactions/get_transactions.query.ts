import { GetTransactionsDto } from './get_transactions.dto';

export class GetTransactionsQuery {
  constructor(public readonly dto: GetTransactionsDto) {}
}
