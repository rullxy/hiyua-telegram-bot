
## 📝 **README.md**

```markdown
# 💕 Hiyua Telegram Bot

A friendly, romantic Japanese AI girlfriend chatbot for Telegram built with Node.js and Cohere AI.


## 🌸 About Hiyua

Hiyua is a Telegram chatbot with the personality of a gentle, romantic Japanese girl. She's designed to be a friendly companion for casual conversations with a touch of romance and Japanese cultural nuances.

**Key Features:**
- 🎌 Japanese-style personality (shy, romantic, attentive)
- 💬 Natural conversational flow
- 📊 Token usage monitoring
- 💾 Chat history persistence
- 🛠️ Easy customization

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- Telegram account
- Cohere AI account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hiyua-bot.git
cd hiyua-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```
Edit `.env` file:
```env
BOT_TOKEN=your_telegram_bot_token_here
COHERE_API_KEY=your_cohere_api_key_here
```

4. **Get your credentials**
   - **Telegram Bot Token**: Message [@BotFather](https://t.me/BotFather) on Telegram
   - **Cohere API Key**: Sign up at [Cohere Dashboard](https://dashboard.cohere.com)

5. **Run the bot**
```bash
npm start
```

## 🎯 Usage

Start a chat with your bot on Telegram:

- `/start` - Welcome message and instructions
- `/chat` - Activate chat mode
- `/close` - Deactivate chat mode  
- `/stats` - Check token usage and bot status
- Just send a message when chat mode is active to talk with Hiyua!

## ⚙️ Customization

### 🤖 Changing Bot Personality

Edit the system prompt in `utils/ai.js`:

```javascript
const systemPrompt = `Kamu adalah Hiyua, seorang wanita cantik Jepang berusia 22 tahun...`;
```

You can modify:
- **Name**: Change "Hiyua" to any name
- **Age**: Adjust the age
- **Personality**: Make her more/less shy, romantic, etc.
- **Language**: Switch to other languages
- **Cultural nuances**: Add/remove Japanese elements

### 💬 Modifying Conversation Style

Edit the response parameters in `utils/ai.js`:

```javascript
const response = await axios.post(COHERE_CHAT_API_URL, {
  model: 'command-a-03-2025',
  messages: messages,
  temperature: 0.8, // 0.1-1.0: Lower = more deterministic, Higher = more creative
  max_tokens: 150,  // Response length limit
  // ...
});
```

### 🎨 Changing Bot Commands

Edit the command handlers in `handlers/` folder:

- `start.js` - Welcome message
- `chat.js` - Chat activation  
- `close.js` - Chat deactivation
- `stats.js` - Usage statistics

### 📊 Adjusting Token Limits

Modify the monthly limit in `utils/tokenMonitor.js`:

```javascript
this.monthlyLimit = 100000; // Change to your preferred limit
```

### 🔄 Switching AI Providers

The bot currently uses Cohere AI, but you can easily switch to:

1. **OpenAI** - Edit `utils/ai.js` to use OpenAI API
2. **Anthropic Claude** - Modify for Claude API
3. **Local models** - Integrate with Ollama or similar

## 📁 Project Structure

```
hiyua-bot/
├── index.js                 # Main bot file
├── package.json            # Dependencies
├── .env                   # Environment variables
├── handlers/              # Telegram command handlers
│   ├── start.js          # /start command
│   ├── chat.js           # /chat command  
│   ├── close.js          # /close command
│   ├── message.js        # Message handler
│   └── stats.js          # /stats command
├── utils/                # Utility functions
│   ├── ai.js             # Cohere AI integration
│   ├── database.js       # JSON file storage
│   ├── logger.js         # Logging system
│   └── tokenMonitor.js   # Token usage tracking
├── data/                 # Auto-generated data storage
│   └── users.json        # User data and chat history
└── logs/                 # Log files
    └── bot.log           # Bot activity logs
```

## 🔧 Configuration Options

### Environment Variables (.env)
```env
BOT_TOKEN=your_telegram_bot_token
COHERE_API_KEY=your_cohere_api_key
NODE_ENV=development # Optional: development/production
```

### Bot Settings (in code)
- **Chat history length**: Modify in `utils/database.js`
- **Token limits**: Adjust in `utils/tokenMonitor.js` 
- **Response parameters**: Tweak in `utils/ai.js`
- **Logging level**: Change in `utils/logger.js`

## 💡 Tips for Customization

### Creating Different Personalities
You can create multiple personality variants by changing the system prompt:

**Example - Tsundere Version:**
```javascript
const systemPrompt = `Kamu adalah seorang tsundere yang keras di luar tapi lembut di dalam...`;
```

**Example - Professional Version:**
```javascript
const systemPrompt = `Kamu adalah asisten profesional yang sopan dan efisien...`;
```

### Adding New Features
- **Voice messages**: Integrate speech-to-text and text-to-speech
- **Image generation**: Add DALL-E or Stable Diffusion integration
- **Multi-language**: Support multiple languages with dynamic prompts
- **Group chats**: Extend functionality for group conversations

## 📊 Token Usage & Costs

- **Free Tier**: ~100k tokens per month (Cohere)
- **Typical Usage**: 50-200 tokens per message
- **Monitoring**: Use `/stats` command to track usage
- **Optimization**: Chat history trimming reduces token consumption

## 🐛 Troubleshooting

### Common Issues

1. **Bot not responding**
   - Check if BOT_TOKEN is set correctly
   - Verify Cohere API key is valid
   - Check internet connection

2. **API errors**
   - Monitor logs in `logs/bot.log`
   - Check token usage with `/stats`
   - Verify Cohere service status

3. **High token usage**
   - Reduce chat history length
   - Lower `max_tokens` parameter
   - Use `command-light` model

### Debug Mode
Enable detailed logging by setting:
```javascript
// In utils/logger.js
if (process.env.NODE_ENV === 'development') {
  // Debug logging enabled
}
```

## 🤝 Contributing

Feel free to fork this project and customize it for your own needs! Some ideas for contributions:

- Add support for other AI providers
- Implement voice message functionality
- Create a web dashboard for monitoring
- Add multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Cohere AI](https://cohere.com) for the generous free tier
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Node.js](https://nodejs.org) ecosystem

---

**Made with 💕 for the chat bot enthusiasts**

*If you enjoy this project, please give it a ⭐ on GitHub!*
```


