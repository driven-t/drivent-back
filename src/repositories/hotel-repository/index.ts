import { prisma } from '@/config';

interface ShowHotelData {
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

  const hotels: ShowHotelData[] = [];
  hotelsWithRooms.forEach((hotelWithRooms) => {
    const { id, name, imageUrl } = hotelWithRooms;

    const roomTypeIds = new Set<number>();
    const roomTypes: { id: number; name: string }[] = [];
    hotelWithRooms.Room.forEach((room) => {
      if (!roomTypeIds.has(room.typeId)) {
        roomTypeIds.add(room.typeId);
        roomTypes.push(room.type);
      }
    });
    roomTypes.sort((firstType, secondType) => firstType.id - secondType.id);
    const roomTypeNames = roomTypes.map((type) => type.name);

    const vacancies = hotelWithRooms.Room.reduce((total, hotelWithRoom) => {
      const roomVacancies = hotelWithRoom.type.vacancies;
      const roomOccupations = hotelWithRoom.Enrollment.length;
      return total + (roomVacancies - roomOccupations);
    }, 0);

    const hotel = { id, name, imageUrl, roomTypeNames, vacancies };
    hotels.push(hotel);
  });
  return hotels;
}

export default { getAll };
