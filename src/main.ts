import './config';
import { ShardingManager } from 'discord.js';
import { config } from './config';
import { deployCommand } from './utils/deployCommand';
import path from 'path';

(async () => {
  await deployCommand();
  const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: config.token,
  });

  manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`);
  });

  manager.spawn();
})();
