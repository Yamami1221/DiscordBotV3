import { EmbedBuilder } from 'discord.js';

export function errorEmbedMessage(
  message: string = 'There was an error while executing this command!',
): EmbedBuilder {
  return new EmbedBuilder().setTitle('❌Error').setDescription(message);
}
