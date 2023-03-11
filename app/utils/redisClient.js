const { createClient } = require('redis');

const redisClient = createClient();

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
