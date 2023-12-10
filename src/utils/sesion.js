require('dotenv').config();
const session = require('express-session');

function initSession() {
  return session({
    secret: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: true,
  });
}

module.exports = {
  initSession,
};
