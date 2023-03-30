import { LoginDto } from '../../dtos';

export class LoginCommand {
  constructor(public readonly dto: LoginDto) {}
}
