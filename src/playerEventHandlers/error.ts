import { GuildQueueEvent } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';

export const error: PlayerEventHandler = {
  name: GuildQueueEvent.error,
  execute(queue, error) {
    if (!(error instanceof Error)) return;
    console.error('discord player error', error);
  },
};
