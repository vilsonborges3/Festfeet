import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import DeliversCotrolers from './app/controllers/DeliversControllers';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post(
  '/createRecipients',
  authMiddleware,
  UserController.createRecipients
);

routes.put(
  '/updateRecipients',
  authMiddleware,
  UserController.updateRecipients
);

routes.post(
  '/createDelivers',
  authMiddleware,
  DeliversCotrolers.createDelivers
);

export default routes;
