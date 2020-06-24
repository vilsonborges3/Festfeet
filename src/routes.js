import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import DeliversControllers from './app/controllers/DeliversControllers';
import OrdersController from './app/controllers/OrdersController';
import SignatureController from './app/controllers/SignatureController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/dispatchOrder/:id', OrdersController.show);
routes.get('/completedDelivery/:id', OrdersController.completed);
routes.post(
  '/signature/:id',
  upload.single('signature'),
  SignatureController.store
);

routes.use(authMiddleware);
routes.post('/createRecipients', UserController.createRecipients);

routes.put('/updateRecipients', UserController.updateRecipients);

routes.post('/createDelivers', DeliversControllers.createDelivers);
routes.get('/delivers', DeliversControllers.index);
routes.put('/deliversUpdate', DeliversControllers.update);
routes.delete('/deletedDeliver', DeliversControllers.remove);

routes.post('/createOrder', OrdersController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
