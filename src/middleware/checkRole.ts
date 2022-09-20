import { Request, Response, NextFunction } from 'express';
import { User, UserSchema } from '../schemas/user.schema';

export const checkRole = (roles: Array<string>) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const id = req.user.id;

    const user = await UserSchema.findById(id);
    if (!user) {
      res.status(401).send('No user found');
    }

    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send('Unauthorized');
  };
};
