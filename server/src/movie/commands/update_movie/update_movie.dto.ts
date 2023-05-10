import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class UpdateMovieDto {
  @ApiPropertyOptional()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  budget: number;

  @ApiPropertyOptional()
  @IsOptional()
  homepage: string;

  @ApiPropertyOptional()
  @IsOptional()
  overview: string;

  @ApiPropertyOptional()
  @IsDecimal()
  @IsOptional()
  popularity: number;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  release_date: Date;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  revenue: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  runtime: number;

  @ApiPropertyOptional()
  @IsOptional()
  movie_status: string;

  @ApiPropertyOptional()
  @IsOptional()
  tagline: string;

  @ApiPropertyOptional()
  @IsDecimal()
  @IsOptional()
  vote_average: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  vote_count: number;

  @ApiPropertyOptional()
  @IsOptional()
  image: string;

  @ApiPropertyOptional()
  @IsOptional()
  backdrop: string;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail: string;

  @ApiPropertyOptional()
  @IsOptional()
  video: string;

  @ApiPropertyOptional()
  @IsOptional()
  trailer: string;

  @ApiPropertyOptional()
  @IsOptional()
  isAdult: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  isSeries: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  seriesId: number;

  @ApiPropertyOptional()
  @IsOptional()
  seriesOrder: number;

  @ApiPropertyOptional()
  @IsOptional()
  poster: string;

  @ApiPropertyOptional()
  @IsOptional()
  userRank: string;
}
