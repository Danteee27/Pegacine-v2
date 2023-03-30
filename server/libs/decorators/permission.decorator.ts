import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums';

export const Permissions = (roles: UserRoleEnum[]) =>
  SetMetadata('permission', roles);
