import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';

export async function confirmPayment(req: Request, res: Response) {
  const { ticket, card } = req.body;

  await ticketService.insertTicket(ticket, card);

  res.sendStatus(201);
}
