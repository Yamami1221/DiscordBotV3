import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ChatInputCommand } from '../utils/types';
import { GuildQueue, Track, useMainPlayer } from 'discord-player';
import { errorEmbedMessage, playEmbedMessage } from '../utils/messages';
import { trackRequestTime } from '../repositories';
import { hyperlinkBold } from '../utils/functions';

export const play: ChatInputCommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Add a track to the queue')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('Query or URL of the track to play')
        .setRequired(true),
    )
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    let voiceChannel;
    try {
      voiceChannel = await getVoiceChannelFromInteraction(interaction);
    } catch (error) {
      if (error instanceof Error) {
        await interaction.editReply({
          embeds: [errorEmbedMessage(error.message)],
        });
      }
      return;
    }
    if (!voiceChannel) {
      await interaction.editReply({
        embeds: [
          playEmbedMessage(
            'You need to be in a voice channel to use this command',
          ),
        ],
      });
      return;
    }
    const query = interaction.options.getString('query', true);
    const player = useMainPlayer();
    try {
      const { queue, track } = await player.play(voiceChannel, query, {
        nodeOptions: {
          metadata: interaction.channel,
          bufferingTimeout: 15000, //How long the player should attempt buffering before giving up
          leaveOnStop: true, //If player should leave the voice channel after user stops the player
          leaveOnStopCooldown: 30000, //Cooldown in ms
          leaveOnEnd: true, //If player should leave after the whole queue is over
          leaveOnEndCooldown: 60000, //Cooldown in ms
          leaveOnEmpty: true, //If the player should leave when the voice channel is empty
          leaveOnEmptyCooldown: 300000, //Cooldown in ms
          pauseOnEmpty: true, //If the player should pause when the voice channel is empty
        },
        requestedBy: interaction.user,
      });
      trackRequestTime.set(track.id, new Date());
      await interaction.editReply({
        embeds: [audioTrackAddEmbedMessage(track, queue)],
      });
    } catch (error) {
      await interaction.editReply({
        embeds: [
          errorEmbedMessage('An error occurred while adding track to queue'),
        ],
      });
    }
  },
};

async function getVoiceChannelFromInteraction(
  interaction: ChatInputCommandInteraction,
) {
  if (!interaction.guildId) {
    throw new Error('This command can only be used in a server');
  }
  const guild = interaction.client.guilds.cache.get(interaction.guildId);
  if (!guild) {
    throw new Error('An error occurred while fetching the guild');
  }
  const member = guild.members.cache.get(interaction.user.id);
  if (!member) {
    throw new Error('An error occurred while fetching the member');
  }
  return member.voice.channel;
}

function audioTrackAddEmbedMessage(track: Track, queue: GuildQueue) {
  return new EmbedBuilder()
    .setTitle(`🎵 Track Added`)
    .setDescription(`**Track**\n${hyperlinkBold(track.toHyperlink())}`)
    .addFields({
      name: 'Estimated time until play',
      value: queue.durationFormatted,
      inline: true,
    })
    .addFields({
      name: 'Song duration',
      value: track.duration,
      inline: true,
    })
    .addFields({
      name: ' ',
      value: ' ',
      inline: true,
    })
    .addFields({
      name: 'Position in upcoming',
      value: queue.tracks.size.toString(),
      inline: true,
    })
    .setFooter({
      text: `Requested by ${track.requestedBy?.globalName}`,
      iconURL: track.requestedBy?.avatarURL() ?? undefined,
    })
    .setThumbnail(track.thumbnail);
}
