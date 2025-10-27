const { getAIResponse } = require('../utils/ai');
const { getUser, saveUser, extractName } = require('../utils/database');
const logger = require('../utils/logger');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const userName = ctx.from.first_name;
    const userMessage = ctx.message.text;
    
    logger.debug(`Message from ${userName} (${userId}): ${userMessage}`);
    
    // Get user data
    let userData = getUser(userId);
    
    // If user doesn't exist or chat mode is off
    if (!userData || !userData.chatMode) {
      logger.debug(`Chat mode OFF for user ${userId}`);
      return ctx.reply(
        'Halo! Aku Hiyua\n' +
        'Ketik /chat untuk memulai percakapan dengan aku! 💕'
      );
    }
    
    logger.debug(`Chat mode ON for user ${userId}`);
    
    // Extract name if mentioned
    const extractedName = extractName(userMessage);
    if (extractedName && extractedName !== userData.name) {
      userData.name = extractedName;
      saveUser(userId, userData);
      logger.info(`User ${userId} name updated to: ${extractedName}`);
    }
    
    // Show typing action
    await ctx.sendChatAction('typing');
    
    // Get AI response
    logger.debug(`Getting AI response for user ${userId}`);
    const aiResponse = await getAIResponse(userId, userMessage, userData);
    logger.debug(`AI response: ${aiResponse}`);
    
    // Save to chat history
    userData.chatHistory.push(
      { role: 'user', message: userMessage },
      { role: 'bot', message: aiResponse }
    );
    
    // Keep only last 20 messages
    if (userData.chatHistory.length > 20) {
      userData.chatHistory = userData.chatHistory.slice(-20);
    }
    
    saveUser(userId, userData);
    
    // Send response
    await ctx.reply(aiResponse);
    logger.info(`Response sent to user ${userId}`);
    
  } catch (error) {
    logger.error(`Message handler error: ${error.message}`);
    logger.error(`Stack: ${error.stack}`);
    ctx.reply('Maaf, aku lagi error nih. Coba lagi ya? 😔');
  }
};