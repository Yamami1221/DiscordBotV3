import {
  GuildQueue,
  GuildQueueEvents,
  Track,
  TrackSkipReason,
} from 'discord-player';
import { TextBasedChannel } from 'discord.js';

export type PlayerEventHandler = {
  name: keyof GuildQueueEvents;
  execute: (
    queue: GuildQueue<TextBasedChannel>,
    track: Track | Array<Track> | number | Error,
    newVolumeOrReason: TrackSkipReason | number,
  ) => unknown;
};
