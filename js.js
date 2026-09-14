const express = require('express');
const { Telegraf } = require('telegraf');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Render serverini uyg'otib turuvchi havola
const RENDER_URL = 'https://devlmovie-bot.onrender.com';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Devlmovie Bot Muvaffaqiyatli Ishlamoqda!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});

// ⚡ SERVERNI UXLATMASLIK TIZIMI (Self-Ping)
setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log('Self-ping muvaffaqiyatli bajarildi');
  }).on('error', (err) => {
    console.error('Self-pingda xatolik:', err.message);
  });
}, 5 * 60 * 1000);

// BOT SOZLAMALARI
const BOT_TOKEN = '8885536115:AAG-CihCUvut-hzgBLO81cUBpOmhYQ4EMo';
const bot = new Telegraf(BOT_TOKEN);

// 👥 FOYDALANUVCHILAR BAZASI
const users = new Set();

// 🎬 1 DAN 50 GACHA KINOLAR RO'YXATI
const movies = {
  "1": { title: "Kino 1", file_id: "FILE_ID_YAZILADI" },
  "2": { title: "Kino 2", file_id: "FILE_ID_YAZILADI" },
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

// /start BUYRUG'I
bot.start((ctx) => {
  users.add(ctx.from.id);
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 1, 2, 50):');
});

// 📊 STATISTIKA BUYRUG'I
bot.hears(['/stat', 'stat', 'Stat'], (ctx) => {
  users.add(ctx.from.id);
  const totalUsers = users.size;
  ctx.reply(`📊 Bot statistikasi:\n\n👥 Jami foydalanuvchilar: ${totalUsers} ta`);
});

// 📹 VIDEO YUBORILGANDA FILE_ID CHIQARISH
bot.on('video', (ctx) => {
  const fileId = ctx.message.video.file_id;
  const duration = ctx.message.video.duration;
  ctx.reply(`📹 Video yuklandi!\n\n🆔 File ID:\n\`${fileId}\`\n\n⏱ Davomiyligi: ${duration} soniya`, { parse_mode: 'Markdown' });
});

// 📩 KOD YUBORILGANDA KINONI YUBORISH
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  users.add(ctx.from.id);

  if (text.startsWith('/')) return;

  if (movies[text] && movies[text].file_id !== "FILE_ID_YAZILADI") {
    try {
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🎬 **${movies[text].title}**\n\n🍿 Maroqli tomosha qiling!`
      });
    } catch (error) {
      ctx.reply('❌ Kinoni yuborishda xatolik yuz berdi.');
    }
  } else {
    ctx.reply('⚠️ Bunday kodli kino topilmadi yoki kino hali yuklanmagan.');
  }
});

// BOTNI ISHGA TUSHIRISH
bot.launch()
  .then(() => console.log('Telegram Bot ishga tushdi!'))
  .catch((err) => console.error('Botni yurgizishda xatolik:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
