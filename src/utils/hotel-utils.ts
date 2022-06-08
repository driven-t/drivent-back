import { ShowHotelData } from '@/repositories/hotel-repository';
import { HotelData } from '@/services/hotel-service';

function formatData(hotelsData: HotelData[]) {
  const hotels: ShowHotelData[] = [];
  hotelsData.forEach((hotelWithRooms) => {
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

const hotelUtils = {
  formatData,
};

export default hotelUtils;
