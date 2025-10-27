const { getUser, saveUser } = require('../utils/database');

module.exports = (ctx) => {
  const userId = ctx.from.id;
  const userName = ctx.from.first_name;
  
  // Initialize user data
  let userData = getUser(userId);
  if (!userData) {
    userData = {
      name: userName,
      chatMode: false,
      chatHistory: []
    };
    saveUser(userId, userData);
  }
  
  ctx.reply(
    `Halo ${userName}! 👋\n` +
    `Aku Hiyua, teman chat AI-mu yang romantis 💖\n\n` +
    `Ketik /chat untuk memulai percakapan berdua dengan aku! 😊\n` +
    `Nanti bisa ketik /close kalau mau berhenti dulu.`
  );
};