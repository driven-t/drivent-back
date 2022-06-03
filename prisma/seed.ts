import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const event = {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
