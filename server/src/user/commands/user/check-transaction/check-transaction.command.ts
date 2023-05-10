import { CheckTransactionDto } from './check-transaction.dto';

export class CheckTransactionCommand {
  constructor(
    public readonly user_id: number,
    public readonly dto: CheckTransactionDto,
  ) {}
}
