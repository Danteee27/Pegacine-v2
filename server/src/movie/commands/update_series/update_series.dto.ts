import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateSeriesDto {
  @ApiPropertyOptional()
  @IsOptional()
  seriesName: string;
  @ApiPropertyOptional()
  @IsOptional()
  seriesDescription: string;
}
