import hotelRepository from '@/repositories/hotel-repository';

export async function getAll() {
  const hotels = await hotelRepository.getAll();
  return hotels;
}

export default { getAll };
