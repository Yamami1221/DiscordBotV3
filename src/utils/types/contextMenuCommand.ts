import {
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from 'discord.js';

export type ContextMenuCommand = {
  data: ContextMenuCommandBuilder;
  execute: (interaction: ContextMenuCommandInteraction) => Promise<void>;
};
