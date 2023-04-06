import { ApiProperty } from '@nestjs/swagger';
import { Max } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  user_id: number;

  @Max(30)
  @ApiProperty()
  name: string;
}
