const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUE3WmtGWHFFNVZyRk9kLzhMb2tmM3FESE9rR3lqeUNrcjRBWEdybnUyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVovTFN4WHFTdjdjN29QOGVVQm1CcEZRYTF4M01RR1VzNG9XVk90NFJRUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQ3dkZXZGd29SR3UxMGUrTlpaYjAxUW91MncvRXRmVk83VlVicHBPRTBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSNGkyUk1TS0hvNDcyU2RCNDlHRjhtNkpmZEUwWWNWQzRobFo2YUxBWUYwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVOT1dlcmJhaUJ6WnBHZnBYbXpmMlhURE1vSExHNW1IT3BZaUtCd0R6RVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhrT0FtR2ZvWURwQkYzaVpjU1VrRDc3Y2hCKzJTUnF3VTRMMFZoS0tZVkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpvKzBQSHJvYzVDNHlYNFYwVUZYaGJKc2tPZTRUQUxKL0Y4bVc5OUZudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnhQZjRuMS96dmZxQkJqbThNYlA1TFpxYlRjQytXdTRWNW90NDlPUy8yWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVwODA2UWxSOXV6eDZES0h2RkRSY09HSk5aZ0FEejB0WVYrZUVodDJZTWdySnFIa0ZGdmQwV1ZkYmFkLzVRaTAwWkVRQkVzR04yalBFWEtGamcvVUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6InZYcC85R09NVHhuQkdidjJnTmJ5OUNRZitPVzVlZUNPaE11RTBmNkZYc3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDY3MTA5NjI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM3RjgxMzVFNTgzOEU1NEVCN0E0REEyOTU5NkU2QjJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTU2ODg3NDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA2NzEwOTYyOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDREExRjFDQUNGODgzNkRGNDM1RUYwMkUxMzA5NTg4RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1Njg4NzQ0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJaMUJDWjdaVyIsIm1lIjp7ImlkIjoiOTIzMDY3MTA5NjI4OjkwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTM2MjE5ODM3MDcxNTI0OjkwQGxpZCIsIm5hbWUiOiJBaSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVhjMlljQkVJN2Vsc1VHR0JBZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUVBPVGtnUk5hWWE5d0JzTHJYeVZUd09zT05qL0tSN0plZy9BeVJqUWhCND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOTBHYmZybHJ5WEYwVW04ZXZVYXdpcTJyaVQ0aXh6Mkc0TmgrMGM0QWpXbklRbjg4OXlhRFM0RjloN1lrOC9pMEdVbDRieXJaZXlXMWROazMrdUxCRGc9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9aY1g2R09VQlJpMnJqaVpRN2JmSlN0SUs2YWhvazhESWZ6ZzlrTVVIR04vQ2lXanhhTTVxb1MyUjlkTTlzM1d5SzdNM1Fjek5qbGVRL3ZZRXFxd0NnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDY3MTA5NjI4OjkwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVEems1SUVUV21HdmNBYkM2MThsVThEckRqWS95a2V5WG9Qd01rWTBJUWUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NTY4ODczMiwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ0VCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923067109628",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
