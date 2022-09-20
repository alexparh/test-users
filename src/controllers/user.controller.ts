import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserRepository } from '../repositories/iUser.repository';
import TYPES from '../inversify/types';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const user = await this.userRepository.getById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }

  public async addUser(req: Request, res: Response) {
    try {
      const newUser = await this.userRepository.insert(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.userRepository.update(req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }

  public async removeUser(req: Request, res: Response) {
    try {
      const deletedUser = await this.userRepository.delete(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }
}
