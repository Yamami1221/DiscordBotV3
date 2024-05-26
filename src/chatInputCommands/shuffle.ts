import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { playEmbedMessage } from '../utils/messages';
import { useQueue } from 'discord-player';

export const shuffle: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the queue.'),
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
        embeds: [playEmbedMessage('There is no music in the queue.')],
      });
      return;
    }
    queue.toggleShuffle(true);
    await interaction.reply({
      embeds: [
        playEmbedMessage(
          queue.isShuffling
            ? 'Shuffled the queue.'
            : 'Stopped shuffling the queue.',
        ),
      ],
    });
  },
};
