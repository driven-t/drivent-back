import { prisma } from '@/config';
import { TicketData } from '@/services';

async function insert(ticket: TicketData) {
  await prisma.ticket.create({
    data: {
      enrollmentId: ticket.enrollmentId,
      eventId: ticket.eventId,
      isOnline: ticket.isOnline,
      withAccommodation: ticket.withAccommodation ? true : false,
    },
  });

  return;
}

async function find(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const ticketRepository = {
  insert,
  find,
};

export default ticketRepository;
