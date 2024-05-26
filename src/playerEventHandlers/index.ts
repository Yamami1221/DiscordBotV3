import { connectionDestroyed } from './connectionDestroyed';
import { emptyChannel } from './emptyChannel';
import { emptyQueue } from './emptyQueue';
import { error } from './error';
import { playerError } from './playerError';
import { playerFinish } from './playerFinish';
import { playerSkip } from './playerSkip';
import { playerStart } from './playerStart';
import { volumeChange } from './volumeChange';

export const playerEventHandlers = {
  connectionDestroyed,
  emptyChannel,
  emptyQueue,
  error,
  playerError,
  playerFinish,
  playerSkip,
  playerStart,
  volumeChange,
};
