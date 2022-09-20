import { Router } from 'express';
import { interfaces } from 'inversify';
import { AuthController } from '../controllers/auth.controller';

export function createAuthRouter(container: interfaces.Container): Router {
  const router = Router();
  const controller = container.resolve(AuthController);

  router.post('/login', (req, res) => controller.login(req, res));

  return router;
}
