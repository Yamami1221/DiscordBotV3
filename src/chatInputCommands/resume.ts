import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { useQueue } from 'discord-player';

export const resume: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the currently paused track')
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
    if (!queue || !queue.currentTrack) {
      await interaction.editReply({
        embeds: [playEmbedMessage('There is no music playing')],
      });
      return;
    }
    if (queue.isPlaying()) {
      await interaction.editReply({
        embeds: [playEmbedMessage('The track is already playing')],
      });
      return;
    }
    queue.node.resume();
    await interaction.editReply({
      embeds: [playEmbedMessage('Resumed the track')],
    });
  },
};
