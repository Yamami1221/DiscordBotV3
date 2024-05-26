import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { ContextMenuCommand, ChatInputCommand } from './utils/types';
import { config } from './config';
import { eventHandlers } from './eventHandlers';
import { contextMenuCommands } from './contextMenuCommands';
import { Player } from 'discord-player';
import { playerEventHandlers } from './playerEventHandlers';
import { chatInputCommands } from './chatInputCommands';

const client = new Client({
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessagePolls,
    GatewayIntentBits.DirectMessagePolls,
  ],
});

Object.values(eventHandlers).forEach((event) => {
  if (event.once) {
    client.once(event.name, (interaction) => event.execute(interaction));
  } else {
    client.on(event.name, (interaction) => event.execute(interaction));
  }
});

export const chatInputCommandsMap = new Map<string, ChatInputCommand>();
Object.values(chatInputCommands).forEach((command) => {
  chatInputCommandsMap.set(command.data.name, command);
});

export const contextMenuCommandsMap = new Map<string, ContextMenuCommand>();
Object.values(contextMenuCommands).forEach((command) => {
  contextMenuCommandsMap.set(command.data.name, command);
});

client.login(config.token);

export const discordPlayer = new Player(client, {
  ytdlOptions: {
    highWaterMark: 1 << 25,
    requestOptions: {
      headers: {
        Cookie: config.youtubeCookie,
      },
    },
  },
});
discordPlayer.extractors.loadDefault();

Object.values(playerEventHandlers).forEach((event) => {
  discordPlayer.events.on(event.name, event.execute);
});
