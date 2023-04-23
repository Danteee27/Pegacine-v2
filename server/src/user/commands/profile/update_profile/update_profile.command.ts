import { UpdateProfileDto } from 'src/user/commands/profile/update_profile/update_profile.dto';

export class UpdateProfileCommand {
  constructor(readonly dto: UpdateProfileDto) {}
}
