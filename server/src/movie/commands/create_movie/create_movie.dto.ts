import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsNumber()
  budget: number;

  @ApiProperty()
  homepage: string;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  @IsDecimal()
  popularity: number;

  @ApiProperty()
  @IsDate()
  release_date: Date;

  @ApiProperty()
  @IsNumber()
  revenue: number;

  @ApiProperty()
  @IsNumber()
  runtime: number;

  @ApiProperty()
  movie_status: string;

  @ApiProperty()
  tagline: string;

  @ApiProperty()
  @IsDecimal()
  vote_average: number;

  @ApiProperty()
  @IsNumber()
  vote_count: number;
}
