import { ApiProperty } from '@nestjs/swagger';

export class GetTransactionsDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
