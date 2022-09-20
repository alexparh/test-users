import { Router } from 'express';
import { interfaces } from 'inversify';
import { UserController } from '../controllers/user.controller';
import JWT from '../middleware/jwt';
import { checkRole } from '../middleware/checkRole';

export function createUserRouter(container: interfaces.Container): Router {
  const router = Router();
  const controller = container.resolve(UserController);
  //Resolve is like container.get<T>(serviceIdentifier: ServiceIdentifier<T>)
  //but it allows users to create an instance even if no bindings have been declared

  router.get('/', JWT.authenticateJWT, checkRole(['admin']), (req, res) =>
    controller.getAllUsers(req, res),
  );
  router.get('/:id', JWT.authenticateJWT, checkRole(['admin']), (req, res) =>
    controller.getUser(req, res),
  );
  router.post('/', JWT.authenticateJWT, checkRole(['admin']), (req, res) =>
    controller.addUser(req, res),
  );
  router.put(
    '/',
    JWT.authenticateJWT,
    checkRole(['admin', 'user']),
    (req, res) => controller.updateUser(req, res),
  );
  router.delete('/:id', JWT.authenticateJWT, checkRole(['admin']), (req, res) =>
    controller.removeUser(req, res),
  );

  return router;
}
