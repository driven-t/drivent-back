import { Request, Response } from 'express';
import ticketsService from '@/services/ticket-service';
import httpStatus from 'http-status';

export async function confirmPayment(req: Request, res: Response) {
  const { ticket } = req.body;

  await ticketsService.insertTicket(ticket);

  res.sendStatus(201);
}
