const tokenMonitor = require('../utils/tokenMonitor');
const { getUser } = require('../utils/database');
const logger = require('../utils/logger');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const userData = getUser(userId);
    const stats = tokenMonitor.getUsageStats();
    
    const userStats = userData ? 
      `• Nama: ${userData.name}\n` +
      `• Chat Mode: ${userData.chatMode ? 'Aktif 💕' : 'Nonaktif'}\n` +
      `• History: ${userData.chatHistory?.length || 0} pesan\n` :
      '• Status: User baru\n';
    
    const message = `📊 **Stats Hiyua Bot**\n\n` +
      `**Penggunaan Token:**\n` +
      `• Digunakan: ${stats.dailyUsage.toLocaleString()} token\n` +
      `• Limit: ${stats.dailyLimit.toLocaleString()} token\n` +
      `• Sisa: ${stats.remaining.toLocaleString()} token\n` +
      `• Persentase: ${stats.percentage}%\n\n` +
      `**Status Kamu:**\n` +
      `${userStats}\n` +
      `🌸 ${stats.percentage < 50 ? 'Masih lancar-lancar aja~' : 
           stats.percentage < 80 ? 'Sedang rame nih...' : 
           'Hampir habis, hati-hati ya!'}`;

    await ctx.reply(message, { parse_mode: 'Markdown' });
    logger.info(`Stats checked by user ${userId} (${ctx.from.first_name})`);
    
  } catch (error) {
    logger.error(`Stats command error: ${error.message}`);
    await ctx.reply(
      'Maaf, tidak bisa mengambil stats sekarang 😔\n' +
      'Coba lagi nanti ya?'
    );
  }
};