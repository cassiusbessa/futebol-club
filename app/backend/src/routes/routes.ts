import { Router } from 'express';
import loginRouter from './UserRoutes';

const router = Router();

router.use('/login', loginRouter);

export default router;
