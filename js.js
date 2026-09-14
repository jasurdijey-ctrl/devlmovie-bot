const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});

// Telegram Bot Token (BotFather'dan olingan tokenni tekshirib qo'ying)
const BOT_TOKEN = '8885536115:AAEsrFq6BczFrb-8TFBaR1P1GDG3tg5p1bg';
const bot = new Telegraf(BOT_TOKEN);

// Foydalanuvchilar bazasi (Statistika uchun)
const users = new Set();

// KINOLAR RO'YXATI (1 dan 50 gacha)
const movies = {
  "2": { title: "Kino 2", file_id: "BAACAgIAAxkBAAIBjGqnlyQ9xPPIDZPJPwI7k6LbYCGiAAK0oQACYKBASabLP9GxaMccPQQ" },
  "1": { title: "Kino 1", file_id: "FILE_ID_YAZILADI" },
  "3": { title: "Kino 3", file_id: "FILE_ID_YAZILADI" },
  "4": { title: "Kino 4", file_id: "FILE_ID_YAZILADI" },
  "5": { title: "Kino 5", file_id: "FILE_ID_YAZILADI" },
  "6": { title: "Kino 6", file_id: "FILE_ID_YAZILADI" },
  "7": { title: "Kino 7", file_id: "FILE_ID_YAZILADI" },
  "8": { title: "Kino 8", file_id: "FILE_ID_YAZILADI" },
  "9": { title: "Kino 9", file_id: "FILE_ID_YAZILADI" },
  "10": { title: "Kino 10", file_id: "FILE_ID_YAZILADI" },
  "11": { title: "Kino 11", file_id: "FILE_ID_YAZILADI" },
  "12": { title: "Kino 12", file_id: "FILE_ID_YAZILADI" },
  "13": { title: "Kino 13", file_id: "FILE_ID_YAZILADI" },
  "14": { title: "Kino 14", file_id: "FILE_ID_YAZILADI" },
  "15": { title: "Kino 15", file_id: "FILE_ID_YAZILADI" },
  "16": { title: "Kino 16", file_id: "FILE_ID_YAZILADI" },
  "17": { title: "Kino 17", file_id: "FILE_ID_YAZILADI" },
  "18": { title: "Kino 18", file_id: "FILE_ID_YAZILADI" },
  "19": { title: "Kino 19", file_id: "FILE_ID_YAZILADI" },
  "20": { title: "Kino 20", file_id: "FILE_ID_YAZILADI" },
  "21": { title: "Kino 21", file_id: "FILE_ID_YAZILADI" },
  "22": { title: "Kino 22", file_id: "FILE_ID_YAZILADI" },
  "23": { title: "Kino 23", file_id: "FILE_ID_YAZILADI" },
  "24": { title: "Kino 24", file_id: "FILE_ID_YAZILADI" },
  "25": { title: "Kino 25", file_id: "FILE_ID_YAZILADI" },
  "26": { title: "Kino 26", file_id: "FILE_ID_YAZILADI" },
  "27": { title: "Kino 27", file_id: "FILE_ID_YAZILADI" },
  "28": { title: "Kino 28", file_id: "FILE_ID_YAZILADI" },
  "29": { title: "Kino 29", file_id: "FILE_ID_YAZILADI" },
  "30": { title: "Kino 30", file_id: "FILE_ID_YAZILADI" },
  "31": { title: "Kino 31", file_id: "FILE_ID_YAZILADI" },
  "32": { title: "Kino 32", file_id: "FILE_ID_YAZILADI" },
  "33": { title: "Kino 33", file_id: "FILE_ID_YAZILADI" },
  "34": { title: "Kino 34", file_id: "FILE_ID_YAZILADI" },
  "35": { title: "Kino 35", file_id: "FILE_ID_YAZILADI" },
  "36": { title: "Kino 36", file_id: "FILE_ID_YAZILADI" },
  "37": { title: "Kino 37", file_id: "FILE_ID_YAZILADI" },
  "38": { title: "Kino 38", file_id: "FILE_ID_YAZILADI" },
  "39": { title: "Kino 39", file_id: "FILE_ID_YAZILADI" },
  "40": { title: "Kino 40", file_id: "FILE_ID_YAZILADI" },
  "41": { title: "Kino 41", file_id: "FILE_ID_YAZILADI" },
  "42": { title: "Kino 42", file_id: "FILE_ID_YAZILADI" },
  "43": { title: "Kino 43", file_id: "FILE_ID_YAZILADI" },
  "44": { title: "Kino 44", file_id: "FILE_ID_YAZILADI" },
  "45": { title: "Kino 45", file_id: "FILE_ID_YAZILADI" },
  "46": { title: "Kino 46", file_id: "FILE_ID_YAZILADI" },
  "47": { title: "Kino 47", file_id: "FILE_ID_YAZILADI" },
  "48": { title: "Kino 48", file_id: "FILE_ID_YAZILADI" },
  "49": { title: "Kino 49", file_id: "FILE_ID_YAZILADI" },
  "50": { title: "Kino 50", file_id: "FILE_ID_YAZILADI" }
};

// /start
bot.start((ctx) => {
  users.add(ctx.from.id);
  ctx.reply('🍿 Kino botga xush kelibsiz!\nKino kodini yuboring:');
});

// Statistika: /stat yoki stat
bot.hears(['/stat', 'stat', 'Stat'], (ctx) => {
  users.add(ctx.from.id);
  ctx.reply(`📊 Botdan foydalanganlar soni: ${users.size} ta odam`);
});

// Botga video yuborilganda file_id berish
bot.on('video', (ctx) => {
  const fileId = ctx.message.video.file_id;
  ctx.reply(`🆔 Video file_id:\n\n\`${fileId}\``, { parse_mode: 'Markdown' });
});

// Kod yuborilganda kino yuborish
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  users.add(ctx.from.id);

  if (text.startsWith('/')) return;

  if (movies[text] && movies[text].file_id !== "FILE_ID_YAZILADI") {
    try {
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🎬 ${movies[text].title}`
      });
    } catch (err) {
      ctx.reply('❌ Videoni yuborishda xatolik bo\'ldi.');
    }
  } else {
    ctx.reply('⚠️ Bunday kodli kino hali joylanmagan.');
  }
});

bot.launch();
