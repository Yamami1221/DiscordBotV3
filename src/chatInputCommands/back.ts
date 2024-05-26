import { useHistory } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { playEmbedMessage } from '../utils/messages';
import { ChatInputCommand } from '../utils/types';
import { hyperlinkBold } from '../utils/functions';

export const back: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('back')
    .setDescription('Plays the previous song in the queue.'),
  async execute(interaction) {
    if (!interaction.guildId) {
      await interaction.reply({
        embeds: [
          playEmbedMessage('This command can only be used in a server.'),
        ],
      });
      return;
    }
    const history = useHistory(interaction.guildId);
    if (!history || !history.previousTrack) {
      await interaction.reply({
        embeds: [playEmbedMessage('There is no previous song.')],
      });
      return;
    }
    await history.previous(true);
    await interaction.reply({
      embeds: [
        playEmbedMessage(
          `Playing the previous song ${hyperlinkBold(history.previousTrack.toHyperlink())}`,
        ),
      ],
    });
  },
};
