import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { ChatInputCommand } from '../utils/types';

export const ping: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot latency'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true,
    });
    const message = await interaction.fetchReply();
    const latency = message.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = interaction.client.shard?.client.ws.ping;
    const embed = new EmbedBuilder()
      .setTitle('🏓Pong!')
      .setDescription(`Latency: ${latency}ms\nAPI Latency: ${apiLatency}ms`)
      .setTimestamp();
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
