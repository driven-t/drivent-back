import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

export interface CardAndTicketData {
  card: CardData;
  ticket: TicketData;
}

export interface CardData {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}

export interface TicketData {
  enrollmentId: number;
  eventId: number;
  isOnline: boolean;
  withAccommodation: boolean;
}

export async function insertTicket(ticket: TicketData) {
  await ticketRepository.insert(ticket);
  return;
}

export function checkExpirationMonth(card: CardData) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (year === card.exp_year) {
    return card.exp_month >= month;
  } else return true;
}

export async function findTicket(enrollmentId: number) {
  const ticket = await ticketRepository.find(enrollmentId);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

const ticketService = {
  insertTicket,
  findTicket,
  checkExpirationMonth,
};

export default ticketService;
