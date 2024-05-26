import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { playEmbedMessage } from '../utils/messages';
import { ChatInputCommand } from '../utils/types';

export const volume: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Sets the volume of the music.')
    .addIntegerOption((option) =>
      option
        .setName('volume')
        .setDescription('The volume to set.')
        .setRequired(true),
    ),
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
    if (!queue || !queue.node) {
      await interaction.reply({
        embeds: [playEmbedMessage('There is no music in the queue.')],
      });
      return;
    }
    const volume = interaction.options.getInteger('volume', true);
    queue.node.setVolume(volume);
    await interaction.reply({
      embeds: [playEmbedMessage(`Set the volume to ${volume}.`)],
    });
  },
};
