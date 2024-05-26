import { clientReady } from './clientReady';
import { error } from './error';
import { interactionCreate } from './interactionCreate';
import { warn } from './warn';

export const eventHandlers = {
  clientReady,
  error,
  interactionCreate,
  warn,
};
