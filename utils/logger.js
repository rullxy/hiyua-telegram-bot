const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/bot.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const logger = {
  info: (message) => {
    const logMessage = `[INFO] ${new Date().toISOString()}: ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  
  error: (message) => {
    const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
    console.error(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  
  warn: (message) => {
    const logMessage = `[WARN] ${new Date().toISOString()}: ${message}\n`;
    console.warn(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },
  
  debug: (message) => {
    const logMessage = `[DEBUG] ${new Date().toISOString()}: ${message}\n`;
    console.debug(logMessage);
    fs.appendFileSync(logFile, logMessage);
  }
};

module.exports = logger;