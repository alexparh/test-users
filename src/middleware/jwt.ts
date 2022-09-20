import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader !== 'null') {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .send({ success: false, message: 'Token Expired' });
        }
        Object.assign(req, { user });
        next();
      });
    } else {
      res.status(403).json({ success: false, message: 'Forbidden' });
    }
  }
}
export default new JWT();
