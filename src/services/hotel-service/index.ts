import hotelRepository from '@/repositories/hotel-repository';
import hotelUtils from '@/utils/hotel-utils';
import { Hotel, Room } from '@prisma/client';

export type HotelData = Hotel & {
  Room: (Room & {
    type: {
      id: number;
      name: string;
      vacancies: number;
    };
    Enrollment: {
      id: number;
    }[];
  })[];
};

export async function getAll() {
  const hotelsData = await hotelRepository.getAll();
  const hotels = hotelUtils.formatData(hotelsData);
  return hotels;
}

export default { getAll };
