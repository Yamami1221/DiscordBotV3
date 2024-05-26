import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { useQueue } from 'discord-player';

export const pause: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the currently playing track')
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    if (!interaction.guildId) {
      await interaction.editReply({
        embeds: [playEmbedMessage('This command can only be used in a server')],
      });
      return;
    }
    const queue = useQueue(interaction.guildId);
    if (!queue || !queue.currentTrack || !queue.isPlaying()) {
      await interaction.editReply({
        embeds: [playEmbedMessage('There is no music playing')],
      });
      return;
    }
    queue.node.pause();
    await interaction.editReply({
      embeds: [playEmbedMessage('Paused the track')],
    });
  },
};
