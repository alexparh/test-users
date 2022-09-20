import TYPES from './types';

import { Container } from 'inversify';
import { IUserRepository } from '../repositories/iUser.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { IAuthRepository } from '../repositories/iAuth.repository';

const container = new Container();
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<IAuthRepository>(TYPES.IAuthRepository)
  .to(AuthRepository)
  .inSingletonScope();

export default container;
