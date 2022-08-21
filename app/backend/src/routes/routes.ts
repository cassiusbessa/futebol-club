import { Router } from 'express';
import errorMiddleware from '../middleware/errorMiddleware';
import loginRouter from './LoginRoutes.routes';

const router = Router();

router.use('/login', loginRouter);
router.use(errorMiddleware);

export default router;
