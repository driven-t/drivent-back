import { Request, Response } from 'express';
import ticketService from '@/services/ticket-service';
import enrollmentsService from '@/services/enrollments-service';
import { invalidDataError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';

export async function confirmPayment(req: Request, res: Response) {
  const { ticket, card } = req.body;

  const validMonth = ticketService.checkExpirationMonth(card);
  if (!validMonth) {
    throw invalidDataError(['credit card expired']);
  }

  await ticketService.insertTicket(ticket);

  res.sendStatus(201);
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
  if (!enrollmentId) {
    res.send(null);
    return;
  }
  const ticket = await ticketService.findTicket(enrollmentId);

  res.status(200).send(ticket);
}
