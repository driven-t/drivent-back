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

const ticketService = {
  insertTicket,
};

export default ticketService;
