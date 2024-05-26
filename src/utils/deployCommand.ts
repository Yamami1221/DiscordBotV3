import { contextMenuCommands } from '../contextMenuCommands';
import { config } from '../config';
import { chatInputCommands } from '../chatInputCommands';
import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';

export async function deployCommand() {
  const chatInputCommandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
    [];
  const contextMenuCommandsData: RESTPostAPIContextMenuApplicationCommandsJSONBody[] =
    [];

  for (const command of Object.values(chatInputCommands)) {
    chatInputCommandsData.push(command.data.toJSON());
  }

  for (const command of Object.values(contextMenuCommands)) {
    contextMenuCommandsData.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(config.token);

  try {
    console.log(
      `Started refreshing ${chatInputCommandsData.length} slash commands and ${contextMenuCommandsData.length} context menu commands.`,
    );

    await rest.put(Routes.applicationCommands(config.clientId), {
      body: [...chatInputCommandsData, ...contextMenuCommandsData],
    });

    console.log(
      `Successfully reloaded ${chatInputCommandsData.length} slash commands and ${contextMenuCommandsData.length} context menu commands.`,
    );
  } catch (error) {
    console.error(
      'Failed to refresh application slash commands and context menu commands.',
    );
    console.error(error);
  }
}
