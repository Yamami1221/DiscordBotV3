import { SlashCommandBuilder, TextBasedChannel } from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { useHistory, useQueue } from 'discord-player';
import { playEmbedMessage } from '../utils/messages';
import { hyperlinkBold } from '../utils/functions';

export const skip: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current track')
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    if (!interaction.guildId) {
      await interaction.editReply({
        embeds: [playEmbedMessage('This command can only be used in a server')],
      });
      return;
    }
    const queue = useQueue<TextBasedChannel>(interaction.guildId);
    if (!queue) {
      await interaction.editReply('No music is being played');
      return;
    }
    if (queue.node.skip()) {
      const history = useHistory<TextBasedChannel>(interaction.guildId);
      if (!history || !history.currentTrack) {
        await interaction.editReply({
          embeds: [playEmbedMessage('There is no track to skip')],
        });
        return;
      }
      await interaction.editReply({
        embeds: [
          playEmbedMessage(
            `${hyperlinkBold(history.currentTrack.toHyperlink())} has been skipped`,
          ),
        ],
      });
    } else {
      await interaction.editReply({
        embeds: [playEmbedMessage('There is no track to skip')],
      });
    }
  },
};
