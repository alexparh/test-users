import { AuthUserDto } from '../dto/authUser.dto';

export interface IAuthRepository {
  login(user: AuthUserDto): Promise<string>;
}
