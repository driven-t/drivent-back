import { init } from '@/app';
import { prisma } from '@/config';
import userService, { duplicatedEmailError } from '@/services/users-service';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { createEvent, createUser as createUserSeed } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('createUser', () => {
  it('should throw duplicatedUserError if there is a user with given email', async () => {
    await createEvent();

    const existingUser = await createUserSeed();

    try {
      await userService.createUser({
        email: existingUser.email,
        password: faker.internet.password(6),
      });
      fail('should throw duplicatedUserError');
    } catch (error) {
      expect(error).toEqual(duplicatedEmailError());
    }
  });

  it('should create user when given email is unique', async () => {
    await createEvent();

    const user = await userService.createUser({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(user).toEqual(
      expect.objectContaining({
        id: dbUser.id,
        email: dbUser.email,
      }),
    );
  });

  it('should hash user password', async () => {
    await createEvent();

    const rawPassword = faker.internet.password(6);
    const user = await userService.createUser({
      email: faker.internet.email(),
      password: rawPassword,
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(dbUser.password).not.toBe(rawPassword);
    expect(await bcrypt.compare(rawPassword, dbUser.password)).toBe(true);
  });
});
