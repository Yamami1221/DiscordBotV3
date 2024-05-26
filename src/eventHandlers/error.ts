import { Events } from 'discord.js';
import { EventHandler } from '../utils/types';

export const error: EventHandler = {
  name: Events.Error,
  once: false,
  async execute(error) {
    console.error(error);
  },
};
