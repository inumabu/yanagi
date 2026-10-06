import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const apiUrl = process.env.YANAGI_API_URL ?? 'http://localhost:8787';
if (!token || !clientId) throw new Error('🔐 DISCORD_TOKEN と DISCORD_CLIENT_ID が必要です');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const commands = [new SlashCommandBuilder().setName('yanagi-health').setDescription('🔌 Yanagi API の状態を確認します')].map((command) => command.toJSON());

client.once('ready', async () => {
  const rest = new REST({ version: '10' }).setToken(token);
  await rest.put(Routes.applicationCommands(clientId), { body: commands });
  console.log(`✅ Yanagi Bot の準備が完了しました：${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== 'yanagi-health') return;
  const response = await fetch(`${apiUrl}/health`);
  await interaction.reply(response.ok ? '✅ Yanagi API は正常です。' : '⚠️ Yanagi API は利用できません。');
});

client.login(token);
