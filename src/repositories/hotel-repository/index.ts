import { prisma } from '@/config';

export interface ShowHotelData {
  id: number;
  name: string;
  imageUrl: string;
  roomTypeNames: string[];
  vacancies: number;
}

async function getAll() {
  const hotelsWithRooms = await prisma.hotel.findMany({
    include: {
      Room: {
        include: {
          type: { select: { id: true, name: true, vacancies: true } },
          Enrollment: { select: { id: true } },
        },
      },
    },
  });

  return hotelsWithRooms;
}

export default { getAll };
