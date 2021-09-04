import { Router } from 'express';

import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/signup', userController.create);

userRoutes.use(ensureAuthenticated);
userRoutes.get('/', userController.get);

export { userRoutes };
