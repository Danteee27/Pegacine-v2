import { CreateProfileDto } from 'src/user/dtos/create_profile.dto';

export class CreateProfileCommand {
  constructor(readonly dto: CreateProfileDto) {}
}
