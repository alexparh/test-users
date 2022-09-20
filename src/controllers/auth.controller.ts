import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IAuthRepository } from '../repositories/iAuth.repository';
import TYPES from '../inversify/types';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  public async login(req: Request, res: Response) {
    try {
      const token = await this.authRepository.login(req.body);
      res.status(200).send(token);
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
}
