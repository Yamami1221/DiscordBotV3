import { Client, Events } from 'discord.js';
import { EventHandler } from '../utils/types';

export const clientReady: EventHandler = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    if (!(client instanceof Client)) return;
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
