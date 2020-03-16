import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserFileController';
import StudentController from './app/controllers/StudentController';

import authMiddlware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// routes.use(authMiddlware);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);

routes.get('/student/:id', StudentController.index);
routes.get('/student', StudentController.index);
routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);

export default routes;
