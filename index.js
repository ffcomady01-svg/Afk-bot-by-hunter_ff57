const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('AFK Bot is running 24/7!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'GOATSMP.enderman.cloud',
    port: 25565,
    username: 'Cloud_AFK_247',
    version: '1.20.4' // Agar aapka SMP 1.21 ya koi aur version hai to yahan wo likhein
  });

  bot.on('spawn', () => {
    console.log('Bot successfully joined GOAT SMP!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected! Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

createBot();
