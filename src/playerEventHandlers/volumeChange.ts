import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';

export const volumeChange: PlayerEventHandler = {
  name: GuildQueueEvent.volumeChange,
  execute(queue, oldVolume, newVolume) {
    queue.metadata.send({
      embeds: [playEmbedMessage(`Volume has been changed to ${newVolume}`)],
    });
  },
};
