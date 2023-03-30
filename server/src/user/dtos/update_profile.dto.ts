import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  profile_id: number;

  @ApiProperty()
  name: string;
}
