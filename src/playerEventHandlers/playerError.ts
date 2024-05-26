import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';

export const playerError: PlayerEventHandler = {
  name: GuildQueueEvent.playerError,
  execute(queue, error) {
    if (!(error instanceof Error)) return;
    console.error('player error', error);
  },
};
