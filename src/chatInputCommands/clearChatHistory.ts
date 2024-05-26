import {
  BaseGuildTextChannel,
  Collection,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { errorEmbedMessage } from '../utils/messages';

export const clearChatHistory: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete messages in a channel')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Amount of messages to delete')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.channel) {
      await interaction.reply({
        embeds: [
          clearChatHistoryEmbedMessage(
            'This command can only be used in a server',
          ),
        ],
      });
      return;
    }
    try {
      await interaction.deferReply();
      const amount = interaction.options.getInteger('amount', true);
      const messages =
        (await interaction.channel.messages.fetch({
          limit: amount + 1,
        })) ?? new Collection();
      if (!(interaction.channel instanceof BaseGuildTextChannel)) {
        await interaction.editReply({
          embeds: [
            clearChatHistoryEmbedMessage(
              'This command can only be used in a server',
            ),
          ],
        });
        return;
      }
      await interaction.channel.bulkDelete(messages);
      const reply = await interaction.channel.send({
        embeds: [
          clearChatHistoryEmbedMessage(`Deleted ${messages.size - 1} messages`),
        ],
      });
      setTimeout(() => {
        if (interaction.channel?.messages.cache.has(reply.id)) {
          reply.delete();
        }
      }, 5000);
    } catch (error) {
      await interaction.channel.send({
        embeds: [errorEmbedMessage('An error occurred while clearing chat')],
      });
    }
  },
};

function clearChatHistoryEmbedMessage(message: string) {
  return new EmbedBuilder().setTitle('🗑Clear').setDescription(message);
}
