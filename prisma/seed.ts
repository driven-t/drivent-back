import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  // Event
  const event = {
    id: 1,
    title: 'Driven.t',
    logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
    backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
    startsAt: dayjs().toDate(),
    endsAt: dayjs().add(21, 'days').toDate(),
    accommodationPrice: 350,
    presentialPrice: 250,
    onlinePrice: 100,
  };

  await prisma.event.upsert({
    where: { id: 1 },
    create: event,
    update: event,
  });

  // Room types
  await prisma.roomType.createMany({
    data: [
      {
        id: 1,
        name: 'Single',
        vacancies: 1,
      },
      {
        id: 2,
        name: 'Double',
        vacancies: 2,
      },
      {
        id: 3,
        name: 'Triple',
        vacancies: 3,
      },
    ],
    skipDuplicates: true,
  });

  // Hotels
  await prisma.hotel.createMany({
    data: [
      {
        id: 1,
        name: 'Driven Resort',
        imageUrl: 'https://content.r9cdn.net/rimg/himg/d6/2c/e4/ice-45729-3081030_3XL-662904.jpg',
      },
      {
        id: 2,
        name: 'Driven Palace',
        imageUrl:
          'https://images.squarespace-cdn.com/content/v1/517e9335e4b0847823500845/1428092264151-F6QOTVI9UH1FJW5WA9KJ/4803156131_8c2fb41aa1_z.jpg',
      },
      {
        id: 3,
        name: 'Driven World',
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/71/ab/97/exterior3.jpg',
      },
    ],
    skipDuplicates: true,
  });

  // Rooms
  const rooms = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 4; k++) {
        rooms.push({
          number: j * 100 + k,
          typeId: i === 3 ? Math.ceil(Math.random() * 2) : Math.ceil(Math.random() * 3),
          hotelId: i,
        });
      }
    }
  }

  await prisma.room.createMany({
    data: rooms,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
