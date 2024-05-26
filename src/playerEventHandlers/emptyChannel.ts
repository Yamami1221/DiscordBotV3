import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { MessageFlags } from 'discord.js';

export const emptyChannel: PlayerEventHandler = {
  name: GuildQueueEvent.emptyChannel,
  async execute(queue) {
    await queue.metadata.send({
      embeds: [playEmbedMessage('No one is in the voice channel, leaving...')],
      flags: MessageFlags.SuppressNotifications,
    });
  },
};
