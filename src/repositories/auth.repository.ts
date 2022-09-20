import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from './iAuth.repository';
import { AuthUserDto } from '../dto/authUser.dto';
import TYPES from '../inversify/types';
import { IUserRepository } from './iUser.repository';
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async login(authUserDto: AuthUserDto): Promise<string> {
    const user = await this.userRepository.getByName(authUserDto.name);
    if (!user) {
      throw new Error('User Not Found');
    }

    const isPasswordMatch = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }
}
