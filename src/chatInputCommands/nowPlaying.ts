import {
  EmbedBuilder,
  SlashCommandBuilder,
  TextBasedChannel,
} from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { GuildQueue, useQueue } from 'discord-player';
import { playEmbedMessage } from '../utils/messages';
import { trackRequestTime } from '../repositories';
import { hyperlinkBold } from '../utils/functions';

export const nowPlaying: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Get the currently playing track')
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
    if (!queue || !queue.currentTrack) {
      await interaction.editReply({
        embeds: [playEmbedMessage('There is no music playing')],
      });
      return;
    }
    await interaction.editReply({
      embeds: [await nowPlayingEmbedMessage(queue)],
    });
  },
};

async function nowPlayingEmbedMessage(queue: GuildQueue<TextBasedChannel>) {
  const track = queue.currentTrack;
  if (!track) {
    return new EmbedBuilder()
      .setTitle('🎵 Now Playing')
      .setDescription('There is no music playing');
  }
  return new EmbedBuilder()
    .setTitle(`🎵 Now Playing`)
    .setDescription(`**Playing**\n${hyperlinkBold(track.toHyperlink())}`)
    .addFields({
      name: 'Progress',
      value: queue.node.createProgressBar() ?? '┃ 🔘 ┃',
      inline: true,
    })
    .addFields({
      name: ' ',
      value: ' ',
      inline: true,
    })
    .setFooter({
      text: `Requested by ${track.requestedBy?.globalName}`,
      iconURL: track.requestedBy?.avatarURL() ?? undefined,
    })
    .setTimestamp(trackRequestTime.get(track.id))
    .setThumbnail(track.thumbnail);
}
