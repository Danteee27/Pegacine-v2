import { RegisterDto } from './register.dto';
export class RegisterCommand {
  constructor(readonly dto: RegisterDto) {}
}
