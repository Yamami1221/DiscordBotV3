import { GuildQueueEvent, Track, TrackSkipReason } from 'discord-player';
import { PlayerEventHandler } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { hyperlinkBold } from '../utils/functions';

export const playerSkip: PlayerEventHandler = {
  name: GuildQueueEvent.playerSkip,
  execute(queue, track, reason) {
    if (!(track instanceof Track)) return;
    if (reason === TrackSkipReason.NoStream) {
      queue.metadata.send({
        embeds: [
          playEmbedMessage(
            `${hyperlinkBold(track.toHyperlink())} has been skipped due to error\nVideo is not available or restricted`,
          ),
        ],
      });
    }
  },
};
