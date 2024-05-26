import { CommandInteraction, Events } from 'discord.js';
import { contextMenuCommandsMap, chatInputCommandsMap } from '../bot';
import { errorEmbedMessage } from '../utils/messages';
import { EventHandler } from '../utils/types';

export const interactionCreate: EventHandler = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!(interaction instanceof CommandInteraction)) return;
    if (interaction.isChatInputCommand()) {
      const command = chatInputCommandsMap.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.deferred) {
          await interaction.editReply({
            embeds: [
              errorEmbedMessage(
                'An error occurred while executing this command',
              ),
            ],
          });
        } else {
          await interaction.reply({
            embeds: [
              errorEmbedMessage(
                'An error occurred while executing this command',
              ),
            ],
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isContextMenuCommand()) {
      const command = contextMenuCommandsMap.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          embeds: [
            errorEmbedMessage('An error occurred while executing this command'),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
