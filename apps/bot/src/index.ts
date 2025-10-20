import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';
import '@sapphire/plugin-logger/register';
import { env } from './env';

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

export let sapphireClient: SapphireClient<boolean> | null = null;
if (sapphireClient) {
  console.log('Realoding bot;');
} else {
  sapphireClient = new SapphireClient({
    baseUserDirectory: import.meta.dir,
    shards: 'auto',
    logger: {
      level: LogLevel.Debug,
    },
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.GuildMember,
      Partials.Reaction,
      Partials.User,
    ],
  });
  try {
  await sapphireClient.login(env.DISCORD_BOT_TOKEN);
  console.log('Login successful');
} catch (error) {
  console.error('Login failed:', error);
}
}