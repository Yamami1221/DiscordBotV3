import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  MONGODB_URI,
  MONGODB_NAME,
  YOUTUBE_COOKIE,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !DISCORD_CLIENT_ID ||
  !MONGODB_URI ||
  !MONGODB_NAME ||
  !YOUTUBE_COOKIE
) {
  throw new Error('Missing environment variables');
}

export const config = {
  token: DISCORD_TOKEN,
  clientId: DISCORD_CLIENT_ID,
  mongoUri: MONGODB_URI,
  mongoDbName: MONGODB_NAME,
  youtubeCookie: YOUTUBE_COOKIE,
};
