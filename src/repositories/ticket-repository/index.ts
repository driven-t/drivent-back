import { prisma } from '@/config';
import { TicketData } from '@/services';

async function insert(ticket: TicketData) {
  await prisma.ticket.create({
    data: {
      enrollmentId: ticket.enrollmentId,
      eventId: ticket.eventId,
      isOnline: ticket.isOnline,
      withAccommodation: ticket.withAccommodation ? ticket.withAccommodation : false,
    },
  });

  return;
}

const ticketRepository = {
  insert,
};

export default ticketRepository;
