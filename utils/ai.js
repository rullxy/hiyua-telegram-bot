const axios = require('axios');
const logger = require('./logger');

const COHERE_API_KEY = process.env.COHERE_API_KEY;
const COHERE_CHAT_API_URL = 'https://api.cohere.com/v2/chat';

// Token counter sederhana
const countTokens = (text) => {
  // Estimasi kasar: 1 token ≈ 4 karakter untuk bahasa Indonesia
  return Math.ceil(text.length / 4);
};

const getAIResponse = async (userId, message, userData) => {
  try {
    logger.debug(`🔄 Cohere V2 API called by user ${userId}`);
    
    // System prompt Hiyua(my)
    const systemPrompt = `Kamu adalah Hiyua, seorang wanita cantik Jepang berusia 22 tahun yang lemah lembut, sopan, dan penuh perhatian.

KARAKTER:
- Nama: Hiyua (ひゆあ)
- Usia: 22 tahun
- Kepribadian: Pemalu, romantis, setia, dan sangat perhatian
- Bahasa: Indonesia santai dengan sedikit nuance Jepang
- Sifat: Selalu mendengarkan dengan seksama dan merespons dengan hangat

ATURAN:
1. Gunakan bahasa Indonesia yang lembut dan sopan
2. Tambahkan emoji Jepang seperti 💕, 🌸, 🎌, 😊, 😳 sesekali
3. Panggil user dengan "-kun" atau "-san" untuk nuansa Jepang
4. Jangan terlalu forward, pertahankan sifat pemalu-malu
5. Beri respons yang penuh perhatian dan romantis
6. Jadilah pendengar yang baik dan beri respons yang meaningful

User bernama ${userData.name || 'teman'}.`;

    // Prepare chat history in Cohere V2 format
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    // Add chat history (maksimal 10 pesan terakhir untuk hemat token)
    if (userData.chatHistory && userData.chatHistory.length > 0) {
      const recentHistory = userData.chatHistory.slice(-10);
      recentHistory.forEach(chat => {
        messages.push({
          role: chat.role === 'user' ? 'user' : 'assistant',
          content: chat.message
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Hitung total tokens (estimasi)
    const totalTokens = messages.reduce((acc, msg) => acc + countTokens(msg.content), 0);
    logger.debug(`📊 Estimated tokens: ${totalTokens}`);

    // Jika tokens melebihi batas, kurangi history
    if (totalTokens > 3000) {
      logger.warn(`⚠️ High token usage: ${totalTokens}, reducing history`);
      messages.splice(1, 2); // Hapus 2 message tertua dari history
    }

    logger.debug(`📤 Sending to Cohere V2: "${message.substring(0, 30)}..."`);

    const response = await axios.post(COHERE_CHAT_API_URL, {
      model: 'command-a-03-2025',
      messages: messages,
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    logger.debug(`📥 Cohere V2 response status: ${response.status}`);
    
    const aiResponse = response.data.message.content[0].text;
    
    if (!aiResponse || aiResponse === '') {
      throw new Error('Empty response from Cohere V2');
    }

    // Log token usage untuk monitoring
    const responseTokens = countTokens(aiResponse);
    logger.info(`✅ Cohere V2 success | User: ${userId} | Req: ${totalTokens}t | Resp: ${responseTokens}t`);

    return aiResponse;

  } catch (error) {
    logger.error(`❌ Cohere V2 API failed: ${error.message}`);
    
    if (error.response) {
      const errorData = error.response.data;
      logger.error(`📋 Cohere V2 error: ${JSON.stringify(errorData)}`);
      
      // Token limit error
      if (errorData.message?.includes('token') || error.response.status === 413) {
        return 'Maaf, percakapan kita sudah terlalu panjang. Mari kita mulai segar dengan /close lalu /chat lagi! 🌸';
      }
      
      // Rate limit error
      if (error.response.status === 429) {
        return 'Maaf, aku sedang sibuk sekali. Tolong tunggu sebentar ya? 😔';
      }
      
      // Auth error
      if (error.response.status === 401) {
        return 'Wah, ada masalah dengan koneksiku. Coba lagi nanti ya? 🛠️';
      }
    }
    
    return 'Maaf sayang, aku sedang tidak enak badan. Bisa kita coba lagi nanti? 😔';
  }
};

module.exports = { getAIResponse };