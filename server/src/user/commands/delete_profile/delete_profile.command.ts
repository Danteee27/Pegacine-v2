import { DeleteProfileDto } from './../../dtos/delete_profile.dto';
export class DeleteProfileCommand {
  constructor(readonly dto: DeleteProfileDto) {}
}
