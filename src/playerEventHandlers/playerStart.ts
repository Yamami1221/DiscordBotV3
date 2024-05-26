import { GuildQueueEvent, Track } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { MessageFlags } from 'discord.js';
import { hyperlinkBold } from '../utils/functions';

export const playerStart: PlayerEventHandler = {
  name: GuildQueueEvent.playerStart,
  async execute(queue, track) {
    if (!(track instanceof Track)) return;
    await queue.metadata.send({
      embeds: [
        playEmbedMessage(
          `Started Playing ${hyperlinkBold(track.toHyperlink())}`,
        ),
      ],
      flags: MessageFlags.SuppressNotifications,
    });
  },
};
