const logger = require('./logger');

class TokenMonitor {
  constructor() {
    this.dailyUsage = 0;
    this.dailyLimit = 100000; // ±100k tokens/hari (adjust sesuai needs)
    this.lastReset = Date.now();
    this.totalRequests = 0;
  }

  countTokens(text) {
    // Estimasi kasar: 1 token ≈ 4 karakter untuk bahasa Indonesia
    return Math.ceil((text || '').length / 4);
  }

  addUsage(inputTokens, outputTokens) {
    const totalTokens = inputTokens + outputTokens;
    this.dailyUsage += totalTokens;
    this.totalRequests++;

    // Reset daily counter jika sudah lewat 24 jam
    if (Date.now() - this.lastReset > 24 * 60 * 60 * 1000) {
      this.dailyUsage = totalTokens;
      this.totalRequests = 1;
      this.lastReset = Date.now();
      logger.info('🔄 Token monitor reset for new day');
    }

    // Log usage periodik setiap 10 request
    if (this.totalRequests % 10 === 0) {
      logger.info(`📊 Token Monitor: ${this.dailyUsage.toLocaleString()}/${this.dailyLimit.toLocaleString()} tokens (${this.getUsagePercentage()}%)`);
    }

    // Warning jika mendekati limit
    if (this.dailyUsage > this.dailyLimit * 0.8) {
      logger.warn(`🚨 Token usage at ${this.getUsagePercentage()}% of daily limit!`);
    }

    return this.dailyUsage;
  }

  getUsagePercentage() {
    return Math.round((this.dailyUsage / this.dailyLimit) * 100);
  }

  isOverLimit() {
    return this.dailyUsage >= this.dailyLimit;
  }

  getUsageStats() {
    return {
      dailyUsage: this.dailyUsage,
      dailyLimit: this.dailyLimit,
      remaining: Math.max(0, this.dailyLimit - this.dailyUsage),
      percentage: this.getUsagePercentage(),
      totalRequests: this.totalRequests
    };
  }

  // Untuk debug
  getStatus() {
    return {
      dailyUsage: this.dailyUsage,
      dailyLimit: this.dailyLimit,
      remaining: this.dailyLimit - this.dailyUsage,
      percentage: this.getUsagePercentage(),
      totalRequests: this.totalRequests,
      lastReset: new Date(this.lastReset).toISOString()
    };
  }
}

module.exports = new TokenMonitor();