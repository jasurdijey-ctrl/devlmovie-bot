const express = require('express');
const https = require('https');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;

const RENDER_URL = 'https://devlmovie.onrender.com';

app.get('/', (req, res) => {
  res.send('Bot 24/7 faol holatda ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});

// Self-Ping
setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log('Self-ping muvaffaqiyatli bajarildi');
  }).on('error', (err) => {
    console.error('Self-ping xatosi:', err.message);
  });
}, 10 * 60 * 1000);

const BOT_TOKEN = '8885536115:AAG-CihCUvut-hZgBLO81cUBpOmhYQ4EMo';
const bot = new Telegraf(BOT_TOKEN);

// 👥 FOYDALANUVCHILARNI SAQLASH UCHUN BAZA (Set usulida, takrorlanmaydi)
const users = new Set();

const movies = {
"62": { title: "Kino nomi 62", file_id: "FILE_ID_YAZILADI" },
  "63": { title: "Kino nomi 63", file_id: "FILE_ID_YAZILADI" },
  "64": { title: "Kino nomi 64", file_id: "FILE_ID_YAZILADI" },
  "65": { title: "Kino nomi 65", file_id: "FILE_ID_YAZILADI" },
  "66": { title: "Kino nomi 66", file_id: "FILE_ID_YAZILADI" },
  "67": { title: "Kino nomi 67", file_id: "FILE_ID_YAZILADI" },
  "68": { title: "Kino nomi 68", file_id: "FILE_ID_YAZILADI" },
  "69": { title: "kino nomi 69", file_id: "FILE_ID_YAZILADI" },
  "70": { title: "Kino nomi 70", file_id: "FILE_ID_YAZILADI" },
  "71": { title: "Kino nomi 71", file_id: "FILE_ID_YAZILADI" },
  "72": { title: "Kino nomi 72", file_id: "FILE_ID_YAZILADI" },
  "73": { title: "Kino nomi 73", file_id: "FILE_ID_YAZILADI" },
  "74": { title: "Kino nomi 74", file_id: "FILE_ID_YAZILADI" },
  "75": { title: "Kino nomi 75", file_id: "FILE_ID_YAZILADI" },
  "76": { title: "Kino nomi 76", file_id: "FILE_ID_YAZILADI" },
  "77": { title: "Kino nomi 77", file_id: "FILE_ID_YAZILADI" },
  "78": { title: "Kino nomi 78", file_id: "FILE_ID_YAZILADI" },
  "79": { title: "Kino nomi 79", file_id: "FILE_ID_YAZILADI" },
  "80": { title: "Kino nomi 80", file_id: "FILE_ID_YAZILADI" },
  "81": { title: "Kino nomi 81", file_id: "FILE_ID_YAZILADI" },
  "82": { title: "Kino nomi 82", file_id: "FILE_ID_YAZILADI" },
  "83": { title: "Kino nomi 83", file_id: "FILE_ID_YAZILADI" },
  "84": { title: "Kino nomi 84", file_id: "FILE_ID_YAZILADI" },
  "85": { title: "Kino nomi 85", file_id: "FILE_ID_YAZILADI" },
  "86": { title: "Kino nomi 86", file_id: "FILE_ID_YAZILADI" },
  "87": { title: "Kino nomi 87", file_id: "FILE_ID_YAZILADI" },
  "88": { title: "Kino nomi 88", file_id: "FILE_ID_YAZILADI" },
  "89": { title: "Kino nomi 89", file_id: "FILE_ID_YAZILADI" },
  "90": { title: "Kino nomi 90", file_id: "FILE_ID_YAZILADI" },
  "91": { title: "Kino nomi 91", file_id: "FILE_ID_YAZILADI" },
  "92": { title: "Kino nomi 92", file_id: "FILE_ID_YAZILADI" },
  "93": { title: "Kino nomi 93", file_id: "FILE_ID_YAZILADI" },
  "94": { title: "Kino nomi 94", file_id: "FILE_ID_YAZILADI" },
  "95": { title: "Kino nomi 95", file_id: "FILE_ID_YAZILADI" },
  "96": { title: "Kino nomi 96", file_id: "FILE_ID_YAZILADI" },
  "97": { title: "Kino nomi 97", file_id: "FILE_ID_YAZILADI" },
  "98": { title: "Kino nomi 98", file_id: "FILE_ID_YAZILADI" },
  "99": { title: "Kino nomi 99", file_id: "FILE_ID_YAZILADI" },
  "100": { title: "Kino nomi 100", file_id: "FILE_ID_YAZILADI" }
    };

// 🎬 /start BUYRUG'I (Yangi foydalanuvchini ro'yxatga oladi)
bot.start((ctx) => {
  const userId = ctx.from.id;
  users.add(userId); // Foydalanuvchi ID'sini bazaga qo'shish

  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 1, 2, 3, 69)');
});

// 📊 STATISTIKANI KO'RISH BUYRUG'I
bot.command('stat', (ctx) => {
  const totalUsers = users.size; // Umumiy odamlar soni
  ctx.reply(`📊 <b>Bot statistikasi:</b>\n\n👥 Botdan foydalanganlar soni: <b>${totalUsers}</b> ta odam`, {
    parse_mode: 'HTML'
  });
});

// 📥 VIDEO TASHALGANDA FILE_ID VA VAQTINI CHIQARIB BERISH
bot.on('video', (ctx) => {
  const fileId = ctx.message.video.file_id;
  const duration = ctx.message.video.duration;

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  ctx.reply(`🎬 <b>Video qabul qilindi!</b>\n\n⏱ <b>Vaqti:</b> ${timeFormatted}\n🔑 <b>file_id:</b>\n<code>${fileId}</code>`, {
    parse_mode: 'HTML'
  });
});

// 📤 FOYDALANUVCHI KOD YUBORGANIDA KINONI YUBORISH
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();

  // Foydalanuvchi har safar yozganida ham bazaga qo'shib qo'yadi (har ehtimolga qarshi)
  users.add(ctx.from.id);

  if (text.startsWith('/')) return;

  if (movies[text] && movies[text].file_id !== "FILE_ID_YAZILADI") {
    try {
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🍿 <b>${movies[text].title}</b>`,
        parse_mode: 'HTML'
      });
    } catch (error) {
      console.error('Video yuborishda xatolik:', error.message);
      await ctx.reply('⚠️ Videoni yuborishda xatolik yuz berdi.');
    }
  } else {
    await ctx.reply(`❌ ${text} kodli kino topilmadi.`);
  }
});

bot.launch();
