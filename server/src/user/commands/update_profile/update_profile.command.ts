import { UpdateProfileDto } from 'src/user/dtos/update_profile.dto';

export class UpdateProfileCommand {
  constructor(readonly dto: UpdateProfileDto) {}
}
