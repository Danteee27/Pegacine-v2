import { RegisterDto } from '../../dtos/register.dto';
export class RegisterCommand {
  constructor(readonly dto: RegisterDto) {}
}
