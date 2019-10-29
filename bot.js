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
  if (message.author.bot) return;
  if (message.content.match(/(I'm |I am )/i)) {
    // let nameWords = message.content.toLowerCase.match(/(?<=i'm |i am ).*?(?=[!?.;,])/i)
    // .split(' ');
    let name = message.content.match(/(?<=I'm |I am ).*?(?=[!?.;,])/i)[0].split(/\s/).map((word, i, arr) => titleCase(word.trim()))
      .join(' ');
    // let test = "they say there ain't seasons in LA";
    // test = name.split(' ').map((word, i, arr) =>   word.toUpperCase().trim())
    //   .join(' ');

    // if (arr.length - 1 !== i) {
    //   return word.toUpperCase().trim + ' ';
    // } else {
    // word.toUpperCase().trim;
    // }

    message.channel.send('Hi, ' + name + ', I\'m Dad-bot. End my suffering.');

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

function hiDadJoke(name) {
  if (name == NULL) return 'Hi, I\'m Dad. Just pull the trigger.';
  return 'Hi, ' + name + ', I\'m Dad. End my suffering.';
}

function titleCase(word) {
  // return phrase.split(/\s/).map(word => {
    if (word !== word.toUpperCase()) {
      return word.toLowerCase().replace(/\b[a-zA-Z]/g, t => t.toUpperCase());
    }
    return word;
  // }).join(' ');
  // return phrase.replace(/\b[a-zA-Z]/g, t => t.toUpperCase());
}
