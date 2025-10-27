const { getUser, saveUser } = require('../utils/database');

module.exports = (ctx) => {
  const userId = ctx.from.id;
  const userData = getUser(userId);
  
  if (userData) {
    userData.chatMode = false;
    saveUser(userId, userData);
  }
  
  ctx.reply(
    `Oke, chat dihentikan 😔\n` +
    `Tapi aku akan kangen lho...\n\n` +
    `Kapan-kapan ketik /chat lagi ya buat ngobrol! 💕\n` +
    `Bye bye~ 👋`
  );
};