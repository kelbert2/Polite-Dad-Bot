var Discord = require('discord.js');
var auth = require('./auth.json');
const config = require('./config.json');

// var bot = new Discord.Client({
//     token: auth.token,
//     autorun: true
// });

const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('Stats bot is ready');
});

bot.on('message', message => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    message.channel.send('I am Dad!');
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('debug', (e) => console.info(e));
bot.on('disconnect', () => {
    bot.connect(); // Will reconnect
});

bot.login(auth.token);