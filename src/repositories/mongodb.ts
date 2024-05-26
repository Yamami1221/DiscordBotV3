import { MongoClient } from 'mongodb';
import { config } from '../config';

export const mongoClient = new MongoClient(config.mongoUri);
export const db = mongoClient.db(config.mongoDbName);
