import {
  Client,
  ClientEvents,
  Events,
  GuildMember,
  Interaction,
  Message,
} from 'discord.js';

export type EventHandler = {
  name: Events | string | keyof ClientEvents;
  once: boolean;
  execute: (
    interaction: Interaction | Message | Client<true> | GuildMember,
  ) => Promise<void>;
};
