import { Request, Response } from 'express';
import hotelService from '@/services/hotel-service';

export async function getHotels(req: Request, res: Response) {
  const hotels = await hotelService.getAll();

  res.send(hotels);
}
