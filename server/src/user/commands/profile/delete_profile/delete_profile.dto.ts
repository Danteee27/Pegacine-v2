import { ApiProperty } from '@nestjs/swagger';

export class DeleteProfileDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  profile_id: number;
}
