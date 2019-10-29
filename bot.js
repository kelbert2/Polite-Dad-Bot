var Discord = require('discord.js');
var auth = require('./auth.json');
const config = require('./config.json');

var jokeTimer;

// var jokeTime = false;

// var bot = new Discord.Client({
//     token: auth.token,
//     autorun: true
// });

const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('Stats bot is ready');
});

bot.on('message', message => {
  // jokeTime = false;
  clearTimeout(jokeTimer);

  if (message.author.bot) return;

  /* Umprompted */
  if (message.content.match(/(I'm |I am )/i)) {
    // setTimeout(setJokeTime, config.inactivityTimerMs, true);
    // setImmediate(hiDadJoke, message);
    jokeTimer = setTimeout(hiDadJoke, config.inactivityTimerMs, message);
  }

  if (!message.content.startsWith(config.prefix)) return;

  // split around spaces
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'ping':
      message.channel.send('pong!');
      break;
    case 'fact':

      break;

    case 'joke':

      break;

    case 'confession':

      break;

    case 'help':

      break;

    default:
      message.channel.send('I am Dad! Please destroy this farce you call my existance.');
  }
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.on('debug', (e) => console.info(e));
bot.on('disconnect', () => {
  bot.connect(); // Will reconnect
});

bot.login(auth.token);

function hiDadJoke(message) {
  // if (jokeTime === false) return;
  let name = message.content.match(/(?<=I'm |I am ).*?((?=[!?.;,])|$)/i)[0].split(/\s/).map((word, i, arr) => titleCase(word.trim()))
    .join(' ');
  if (name == null) {
    message.channel.send('Hi, I\'m Dad. Just pull the trigger.');
  }
  message.channel.send('Hi, ' + name + ', I\'m Dad. End my suffering.');
  // jokeTime = false;
}

function titleCase(word) {
  if (word !== word.toUpperCase()) {
    return word.toLowerCase().replace(/\b[a-zA-Z]/g, t => t.toUpperCase());
  }
  return word;
}

// function setJokeTime(bool) {
//   jokeTime = bool;
// }
