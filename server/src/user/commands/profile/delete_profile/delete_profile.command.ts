import { DeleteProfileDto } from './delete_profile.dto';
export class DeleteProfileCommand {
  constructor(readonly dto: DeleteProfileDto) {}
}
