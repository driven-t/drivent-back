import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';
import { invalidDataError } from '@/errors';

export async function confirmPayment(req: Request, res: Response) {
  const { ticket, card } = req.body;

  const validMonth = ticketService.checkExpirationMonth(card);
  if (!validMonth) {
    throw invalidDataError(['credit card expired']);
  }

  await ticketService.insertTicket(ticket);

  res.sendStatus(201);
}
