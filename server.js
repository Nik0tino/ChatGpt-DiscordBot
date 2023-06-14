const { Client, Intents } = require('discord.js');
const axios = require('axios');

// Initialize Discord bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

  async function getChatGPTResponse(message) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    };
    const payload = {
      'model': 'gpt-3.5-turbo',
      'messages': [{'role': 'system', 'content': 'You are a user.'}, {'role': 'user', 'content': message}],
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
    if (message.channel.id === "1117657503191273482") {
    const content = message.content;
    const response = await getChatGPTResponse(content);
    message.reply(response);
}
  });


client.login(process.env.token);
