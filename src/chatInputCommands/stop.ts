import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { playEmbedMessage } from '../utils/messages';
import { ChatInputCommand } from '../utils/types';

export const stop: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and clears the queue.'),
  async execute(interaction) {
    if (!interaction.guildId) {
      await interaction.reply({
        embeds: [
          playEmbedMessage('This command can only be used in a server.'),
        ],
      });
      return;
    }
    const queue = useQueue(interaction.guildId);
    if (!queue || queue.tracks.size === 0) {
      await interaction.reply({
        embeds: [playEmbedMessage('There is no music currently playing.')],
      });
      return;
    }
    queue.delete();
    await interaction.reply({
      embeds: [playEmbedMessage('Stopped the music and cleared the queue.')],
    });
  },
};
