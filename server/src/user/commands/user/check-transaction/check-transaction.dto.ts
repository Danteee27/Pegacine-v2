import { ApiProperty } from '@nestjs/swagger';

export class CheckTransactionDto {
  @ApiProperty()
  transaction_type: string;

  @ApiProperty()
  transaction_date: Date;

  @ApiProperty()
  access_token: string;
}
