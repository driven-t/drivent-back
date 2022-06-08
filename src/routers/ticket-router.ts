import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';
import { confirmPayment, getTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.post('/payment', authenticateToken, validateBody(createPaymentSchema), confirmPayment);
ticketsRouter.get('/', authenticateToken, getTicket);

export { ticketsRouter };
