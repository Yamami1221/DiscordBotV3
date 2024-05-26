import { Events } from 'discord.js';
import { EventHandler } from '../utils/types';

export const warn: EventHandler = {
  name: Events.Warn,
  once: false,
  async execute(info) {
    console.warn(info);
  },
};
