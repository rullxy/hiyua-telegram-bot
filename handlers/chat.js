const { getUser, saveUser } = require('../utils/database');
const logger = require('../utils/logger');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    let userData = getUser(userId);
    
    logger.info(`User ${userId} activating chat mode`);
    
    if (!userData) {
      userData = {
        name: ctx.from.first_name,
        chatMode: true,
        chatHistory: []
      };
    } else {
      userData.chatMode = true;
    }
    
    saveUser(userId, userData);
    
    await ctx.reply(
      `Yay! Mode chat diaktifkan! 💕\n\n` +
      `Sekarang kita bisa ngobrol berdua...\n` +
      `Aku tunggu cerita dan pertanyaanmu 😊\n\n` +
      `Ketik /close kalau mau berhenti chat.`
    );
    
    logger.info(`Chat mode activated for user ${userId}`);
    
  } catch (error) {
    logger.error(`Chat handler error: ${error.message}`);
    ctx.reply('Maaf, ada error saat mengaktifkan chat mode 😔');
  }
};