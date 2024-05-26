import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { MessageFlags } from 'discord.js';

export const emptyQueue: PlayerEventHandler = {
  name: GuildQueueEvent.emptyQueue,
  async execute(queue) {
    await queue.metadata.send({
      embeds: [playEmbedMessage('No more songs in queue')],
      flags: MessageFlags.SuppressNotifications,
    });
  },
};
