import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../schemas/user.schema';
import { IUserRepository } from './iUser.repository';
import { InsertUserDto } from '../dto/insertUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';

@injectable()
export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    return UserSchema.find();
  }
  async getById(id: any): Promise<User> {
    return UserSchema.findById(id);
  }
  async getByName(name: string): Promise<User> {
    return UserSchema.findOne({ name });
  }
  async insert(insertUserDto: InsertUserDto): Promise<User> {
    const user = await this.getByName(insertUserDto.name);
    if (user) {
      throw new Error('User with this name alreadt exist');
    }

    const newUser = new UserSchema(insertUserDto);
    return newUser.save();
  }
  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, oldPassword, newPassword, name } = updateUserDto;

    const user = await this.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const dataForUpdate = {};

    if (newPassword) {
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid old password');
      }
      const hashPassword = await bcrypt.hash(newPassword, 10);

      dataForUpdate['password'] = hashPassword;
    }

    if (name) {
      dataForUpdate['name'] = name;
    }
    return UserSchema.findByIdAndUpdate({ _id: id }, dataForUpdate, {
      new: true,
    });
  }
  async delete(id: any): Promise<User> {
    const user = await this.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return UserSchema.findByIdAndDelete(id);
  }
}
