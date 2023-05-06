import { ApiProperty } from '@nestjs/swagger';

export class CreateSeriesDto {
  @ApiProperty()
  seriesName: string;

  @ApiProperty()
  seriesDescription: string;
}
