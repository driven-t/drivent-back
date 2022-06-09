import dayjs from 'dayjs';

import { connectRedis } from '@/config';

async function findFirst() {
  const redisClient = await connectRedis();
  const storedEvent = await redisClient.get('event');

  if (!storedEvent) {
    const event = {
      id: 1,
      title: 'Driven.t',
      logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate().toISOString(),
      endsAt: dayjs().add(21, 'days').toDate().toISOString(),
      accommodationPrice: 350,
      presentialPrice: 250,
      onlinePrice: 100,
    };

    redisClient.set('event', JSON.stringify(event));
    return event;
  }

  return JSON.parse(storedEvent);
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
