import { UserRoleEnum } from '../enums/roles';

export class InsertUserDto {
  role: UserRoleEnum;
  name: string;
  password: string;
}
