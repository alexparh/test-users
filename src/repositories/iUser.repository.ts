import { InsertUserDto } from '../dto/insertUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../schemas/user.schema';

export interface IUserRepository {
  getAll(): Promise<Array<User>>;
  getById(id: string): Promise<User>;
  getByName(name: string): Promise<User>;
  insert(user: InsertUserDto): Promise<User>;
  update(user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<User>;
}
