import { CreateProfileDto } from './create_profile.dto';

export class CreateProfileCommand {
  constructor(readonly dto: CreateProfileDto) {}
}
