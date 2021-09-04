import { Router } from 'express';

import AuthenticateController from '../controllers/AuthenticateController';

const sessionRoutes = Router();

const authenticateController = new AuthenticateController();

sessionRoutes.post('/', authenticateController.create);

export { sessionRoutes };
