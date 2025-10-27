require('dotenv').config();
const { Telegraf } = require('telegraf');
const logger = require('./utils/logger');

// Import semua handlers
const startHandler = require('./handlers/start');
const chatHandler = require('./handlers/chat'); 
const closeHandler = require('./handlers/close');
const messageHandler = require('./handlers/message');
const statsHandler = require('./handlers/stats'); // NEW

const bot = new Telegraf(process.env.BOT_TOKEN);

// Global error handler
bot.catch((err, ctx) => {
  logger.error(`Bot error: ${err.message}`);
  logger.error(`Stack: ${err.stack}`);
  ctx.reply('Maaf, ada error nih. Coba lagi ya? 😔');
});

// Register semua handlers
bot.start(startHandler);
bot.command('chat', chatHandler);
bot.command('close', closeHandler);
bot.command('stats', statsHandler); // NEW - Stats command
bot.on('text', messageHandler);

// Test connection on startup
bot.telegram.getMe().then((botInfo) => {
  logger.info(`🤖 Bot connected as: ${botInfo.username}`);
}).catch(err => {
  logger.error(`❌ Bot connection failed: ${err.message}`);
});

// Start bot
logger.info('🚀 Starting Hiyua Bot...');
logger.info(`🤖 Bot Token: ${process.env.BOT_TOKEN ? '✅ Set' : '❌ Missing'}`);
logger.info(`💝 Cohere API Key: ${process.env.COHERE_API_KEY ? '✅ Set' : '❌ Missing'}`);

bot.launch().then(() => {
  logger.info('✅ Bot started successfully!');
}).catch(err => {
  logger.error(`❌ Failed to start bot: ${err.message}`);
});

// Enable graceful stop
process.once('SIGINT', () => {
  logger.info('🛑 Bot stopping (SIGINT)');
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  logger.info('🛑 Bot stopping (SIGTERM)');
  bot.stop('SIGTERM');
});