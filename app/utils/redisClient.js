const { createClient } = require('redis');
const { REDIS_HOST } = require('../../config');

const redisClient = createClient({url: REDIS_HOST})

redisClient.connect();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
redisClient.on('ready', () =>
  console.log('Redis Client connected and ready to use...')
);
redisClient.on('end', () => {
  console.log('Redis client disconnected ');
});

// process.on('SIGINT', () => {
//   client.disconnect();
// });

module.exports = redisClient;
