const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(dataPath))) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
}

// Load all users data
const loadData = () => {
  if (!fs.existsSync(dataPath)) {
    return {};
  }
  try {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading data:', error);
    return {};
  }
};

// Save all users data
const saveData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Get user by ID
const getUser = (userId) => {
  const data = loadData();
  return data[userId] || null;
};

// Save user data
const saveUser = (userId, userData) => {
  const data = loadData();
  data[userId] = userData;
  saveData(data);
};

// Extract name from message
const extractName = (message) => {
  const keywords = ['namaku', 'nama aku', 'panggil aku', 'nama saya', 'namaku adalah', 'nama gue'];
  const messageLower = message.toLowerCase();
  
  for (const keyword of keywords) {
    if (messageLower.includes(keyword)) {
      const startIndex = messageLower.indexOf(keyword) + keyword.length;
      const namePart = message.substring(startIndex).trim();
      const name = namePart.split(/\s+/)[0].replace(/[.,!?]/g, '');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return null;
};

module.exports = {
  loadData,
  saveData,
  getUser,
  saveUser,
  extractName
};