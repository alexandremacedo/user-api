import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import './typeorm';
import '@shared/container';
import globalExceptionHandler from './middlewares/globalExceptionHandler';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(globalExceptionHandler);

app.listen(3333, () => console.log('🖖 Server is running on port 3333!'));
