import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { MessageFlags } from 'discord.js';

export const connectionDestroyed: PlayerEventHandler = {
  name: GuildQueueEvent.connectionDestroyed,
  async execute(queue) {
    await queue.metadata.send({
      embeds: [playEmbedMessage('No activity for 1 minute, leaving...')],
      flags: MessageFlags.SuppressNotifications,
    });
  },
};
