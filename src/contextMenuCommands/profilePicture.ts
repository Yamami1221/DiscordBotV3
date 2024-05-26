import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
} from 'discord.js';
import { ContextMenuCommand } from '../utils/types';
import { errorEmbedMessage } from '../utils/messages';

export const profilePicture: ContextMenuCommand = {
  data: new ContextMenuCommandBuilder()
    .setName('Profile Picture')
    .setType(ApplicationCommandType.User)
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.guild) {
      await interaction.reply({
        embeds: [
          errorEmbedMessage('This command can only be used in a server'),
        ],
        ephemeral: true,
      });
      return;
    }
    const targetUser = interaction.guild.members.cache.get(
      interaction.targetId,
    );
    if (!targetUser) {
      await interaction.reply({
        content: 'User not found.',
        ephemeral: true,
      });
      return;
    }
    const embed = new EmbedBuilder()
      .setTitle(`${targetUser.user.username}'s Profile Picture`)
      .setImage(targetUser.user.displayAvatarURL({ size: 4096 }))
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
