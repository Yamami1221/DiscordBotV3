import { EmbedBuilder } from 'discord.js';

export function playEmbedMessage(description: string) {
  return new EmbedBuilder().setDescription('🎵 ' + description);
}
