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

// ⚡️ SERVERNI UXLATMASLIK TIZIMI (Self-Ping)
setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log('Self-ping muvaffaqiyatli bajarildi');
  }).on('error', (err) => {
    console.error('Self-ping xatosi:', err.message);
  });
}, 10 * 60 * 1000);

const BOT_TOKEN = '8885536115:AAG-CihCUvut-hZgBLO81cUBpOmhYQ4EMo';
const bot = new Telegraf(BOT_TOKEN);

// 👥 FOYDALANUVCHILAR BAZASI
const users = new Set();

// 🎬 1 DAN 100 GACHA KINOLAR RO'YXATI
const movies = {
  "1": { title: "Qasoskorlar: Intihoy", file_id: "BAACAgIAAxkBAPyaqeA3qLG2VubWF1Lwyx36RKS2SEAAsOgAAJgoEBJv7wYX02X4GQ9BA" },
  "2": { title: "Ferdinand multfilmi", file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA" },
  "3": { title: "Uyda yolgiz 1", file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA" },
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
  "50": { title: "Kino 50", file_id: "FILE_ID_YAZILADI" },
  "51": { title: "Kino 51", file_id: "FILE_ID_YAZILADI" },
  "52": { title: "Kino 52", file_id: "FILE_ID_YAZILADI" },
  "53": { title: "Kino 53", file_id: "FILE_ID_YAZILADI" },
  "54": { title: "Kino 54", file_id: "FILE_ID_YAZILADI" },
  "55": { title: "Kino 55", file_id: "FILE_ID_YAZILADI" },
  "56": { title: "Kino 56", file_id: "FILE_ID_YAZILADI" },
  "57": { title: "Kino 57", file_id: "FILE_ID_YAZILADI" },
  "58": { title: "Kino 58", file_id: "FILE_ID_YAZILADI" },
  "59": { title: "Kino 59", file_id: "FILE_ID_YAZILADI" },
  "60": { title: "Kino 60", file_id: "FILE_ID_YAZILADI" },
  "61": { title: "Kino 61", file_id: "FILE_ID_YAZILADI" },
  "62": { title: "Kino 62", file_id: "FILE_ID_YAZILADI" },
  "63": { title: "Kino 63", file_id: "FILE_ID_YAZILADI" },
  "64": { title: "Kino 64", file_id: "FILE_ID_YAZILADI" },
  "65": { title: "Kino 65", file_id: "FILE_ID_YAZILADI" },
  "66": { title: "Kino 66", file_id: "FILE_ID_YAZILADI" },
  "67": { title: "Kino 67", file_id: "FILE_ID_YAZILADI" },
  "68": { title: "Kino 68", file_id: "FILE_ID_YAZILADI" },
  "69": { title: "Ferdinand multfilmi", file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA" },
  "70": { title: "Kino 70", file_id: "FILE_ID_YAZILADI" },
  "71": { title: "Kino 71", file_id: "FILE_ID_YAZILADI" },
  "72": { title: "Kino 72", file_id: "FILE_ID_YAZILADI" },
  "73": { title: "Kino 73", file_id: "FILE_ID_YAZILADI" },
  "74": { title: "Kino 74", file_id: "FILE_ID_YAZILADI" },
  "75": { title: "Kino 75", file_id: "FILE_ID_YAZILADI" },
  "76": { title: "Kino 76", file_id: "FILE_ID_YAZILADI" },
  "77": { title: "Kino 77", file_id: "FILE_ID_YAZILADI" },
  "78": { title: "Kino 78", file_id: "FILE_ID_YAZILADI" },
  "79": { title: "Kino 79", file_id: "FILE_ID_YAZILADI" },
  "80": { title: "Kino 80", file_id: "FILE_ID_YAZILADI" },
  "81": { title: "Kino 81", file_id: "FILE_ID_YAZILADI" },
  "82": { title: "Kino 82", file_id: "FILE_ID_YAZILADI" },
  "83": { title: "Kino 83", file_id: "FILE_ID_YAZILADI" },
  "84": { title: "Kino 84", file_id: "FILE_ID_YAZILADI" },
  "85": { title: "Kino 85", file_id: "FILE_ID_YAZILADI" },
  "86": { title: "Kino 86", file_id: "FILE_ID_YAZILADI" },
  "87": { title: "Kino 87", file_id: "FILE_ID_YAZILADI" },
  "88": { title: "Kino 88", file_id: "FILE_ID_YAZILADI" },
  "89": { title: "Kino 89", file_id: "FILE_ID_YAZILADI" },
  "90": { title: "Kino 90", file_id: "FILE_ID_YAZILADI" },
  "91": { title: "Kino 91", file_id: "FILE_ID_YAZILADI" },
  "92": { title: "Kino 92", file_id: "FILE_ID_YAZILADI" },
  "93": { title: "Kino 93", file_id: "FILE_ID_YAZILADI" },
  "94": { title: "Kino 94", file_id: "FILE_ID_YAZILADI" },
  "95": { title: "Kino 95", file_id: "FILE_ID_YAZILADI" },
  "96": { title: "Kino 96", file_id: "FILE_ID_YAZILADI" },
  "97": { title: "Kino 97", file_id: "FILE_ID_YAZILADI" },
  "98": { title: "Kino 98", file_id: "FILE_ID_YAZILADI" },
  "99": { title: "Kino 99", file_id: "FILE_ID_YAZILADI" },
  "100": { title: "Kino 100", file_id: "FILE_ID_YAZILADI" }
};

// 🎬 /start BUYRUG'I
bot.start((ctx) => {
  users.add(ctx.from.id);
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 1, 2, 3, 69)');
});

// 📊 STATISTIKA BUYRUG'I
bot.hears(['/stat', 'stat', 'Stat'], (ctx) => {
  users.add(ctx.from.id);
  const totalUsers = users.size;
  ctx.reply(`📊 <b>Bot statistikasi:</b>\n\n👥 Botdan foydalanganlar soni: <b>${totalUsers}</b> ta odam`, {
    parse_mode: 'HTML'
  });
});

// 📥 VIDEO YUBORILGANDA FILE_ID CHIQARISH
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

// 📤 KOD YUBORILGANDA KINONI YUBORISH
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();

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
