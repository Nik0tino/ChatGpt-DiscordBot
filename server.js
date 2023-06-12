const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { Client, Intents } = require('discord.js');

app.get('/', (req, res) => {
  res.send('Predators Manager Started Successfully !');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity({ name: "OpenAi Chat", type: "PLAYING" });
  client.user.setStatus('idle');
});

// Define ChatGPT Function
async function getChatGPTResponse(message) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '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'; // Replace with your OpenAI API key
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };
  const payload = {
    'model': 'gpt-3.5-turbo',
    'messages': [
      { 'role': 'system', 'content': 'You are a user.' },
      { 'role': 'user', 'content': message },
    ],
  };
  try {
    const response = await axios.post(apiUrl, payload, { headers });
    const reply = response.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('Failed to get AI response:', error);
    return 'Sorry, an error occurred.';
  }
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; 
  if (message.channel.id === "1117598652815376385") { //id d room
    const content = message.content;
    const response = await getChatGPTResponse(content);
    message.reply(response);
  }
});

client.login(''); // token hna
