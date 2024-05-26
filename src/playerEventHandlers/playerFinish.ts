import { GuildQueueEvent, Track } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { trackRequestTime } from '../repositories';

export const playerFinish: PlayerEventHandler = {
  name: GuildQueueEvent.playerFinish,
  execute(queue, track) {
    if (!(track instanceof Track)) return;
    trackRequestTime.delete(track.id);
  },
};
