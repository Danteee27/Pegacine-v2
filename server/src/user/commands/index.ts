import { DeleteProfileCommandHandler } from './delete_profile/delete_profile.handler';
import { RegisterCommandHandler } from './register/register.handler';
import { LoginCommandHandler } from './login';
import { CreateProfileCommandHandler } from './create_profile/create_profile.handler';

export const CommandHandlers = [
  RegisterCommandHandler,
  LoginCommandHandler,
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
];
