import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
const token=process.env.DISCORD_TOKEN;const clientId=process.env.DISCORD_CLIENT_ID;const apiUrl=process.env.YANAGI_API_URL??'http://localhost:8787';
if(!token||!clientId) throw new Error('DISCORD_TOKEN and DISCORD_CLIENT_ID are required');
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates]});
const commands=[new SlashCommandBuilder().setName('yanagi-health').setDescription('Show Yanagi API health')].map(c=>c.toJSON());
client.once('ready',async()=>{const rest=new REST({version:'10'}).setToken(token);await rest.put(Routes.applicationCommands(clientId),{body:commands});console.log(`Yanagi bot ready as ${client.user?.tag}`);});
client.on('interactionCreate',async interaction=>{if(!interaction.isChatInputCommand())return;if(interaction.commandName==='yanagi-health'){const response=await fetch(`${apiUrl}/health`);await interaction.reply(response.ok?'Yanagi API is healthy.':'Yanagi API is unavailable.');}});
client.login(token);
