import { createClient } from 'redis';

export async function connectRedis() {
  const client = createClient();
  await client.connect();
  return client;
}
