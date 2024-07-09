const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = "6468802328:AAFE4JDKziayPRO-sxtCoEGGs7e2B4HcD18";
const webAppUrl = "http://localhost:3000/";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  // send a message to the chat acknowledging receipt of their message

  if( text === '/start') {

    bot.sendMessage(chatId, 'Это заготовка бота',{
      reply_markup:{
        inline_keyboard:[
          [{text: 'СТАРТ', web_app: {url: webAppUrl}}]
        ]
      }
    });
  }
  
});