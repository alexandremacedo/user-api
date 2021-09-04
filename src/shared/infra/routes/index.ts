import { sessionRoutes } from '@modules/users/infra/routes/session.routes';
import { userRoutes } from '@modules/users/infra/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/signin', sessionRoutes);
routes.use('/users', userRoutes);

export { routes };
