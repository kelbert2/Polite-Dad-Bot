var Discord = require('discord.js');
var auth = require('./auth.json');
const config = require('./config.json');
const greetings = require('./greetings.json');

var jokeTimer;

// var bot = new Discord.Client({
//     token: auth.token,
//     autorun: true
// });

const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('DadBot is ready');
});

bot.on('message', message => {
  clearTimeout(jokeTimer);

  if (message.author.bot) return;

  /* Umprompted */
  if (message.content.match(/(I'm |I am |I’m |I m |im )/i)) {
    // setTimeout(setJokeTime, config.inactivityTimerMs, true);
    // setImmediate(hiDadJoke, message);
    jokeTimer = setTimeout(hiDadJoke, config.inactivityTimerMs, message);
  }

  if (message.content.toLowerCase().startsWith(config.altPrefix)) {
    message.channel.send('I only respond to "daddy" ;-)');
  }

  if (!message.content.toLowerCase().startsWith(config.prefix)) return;

  // split around spaces
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'ping':
      message.channel.send('pong!');
      break;
    case 'fact':
      message.channel.send('capitalism is a disease and classism is a symptom.');
      break;

    case 'joke':
      message.channel.send('Someday I\'ll have reason to say I\'m proud of you.');
      break;

    case 'confession':
      message.channel.send('I have no idea what the NASDAQ is, only that it will be destroyed if Wal-mart has to pay their employees enough to get them off of welfare.');
      break;

    case 'help':
      message.channel.send('I am DadBot. I respond to Dad Jokes, if I\'m not interrupted. You can say my name and then fact, joke, or confession, and I\'ll respond.');
      break;

    default:
      message.channel.send('I am DadBot! Please destroy this farce you call my existence.');
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
  let name = message.content.match(/(?<=I'm |I am |I’m |I m |im).*?((?=[!?.;,])|$)/i)[0].split(/\s/).map((word, i, arr) => titleCase(word.trim()))
    .join(' ');
  if (name == null) {
    message.channel.send('Hi, I\'m DadBot. Just pull the trigger.');
  }

  message.channel.send(getRandomGreeting(name));
}

function titleCase(word) {
  if (word !== word.toUpperCase()) {
    return word.toLowerCase().replace(/\b[a-zA-Z]/g, t => t.toUpperCase());
  }
  return word;
}

function getRandomGreeting(name) {
  const randIndex = Math.floor(Math.random() * greetings.greetings.length)
  const mess = greetings.greetings[randIndex].split("[name]");
  return mess[0] + name + mess[1];
}
