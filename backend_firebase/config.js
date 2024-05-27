const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  EMAIL_USER,
  EMAIL_PASSWORD,
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  databaseURL,
  measurementId,

} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

module.exports = {
  email: EMAIL_USER,
  password: EMAIL_PASSWORD,
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  },
};