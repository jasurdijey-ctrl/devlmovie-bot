const express = require('express');
const https = require('https');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;

// Render bergan Web Service havolasini shu yerga yozing
const RENDER_URL = 'https://devlmovie.onrender.com';

app.get('/', (req, res) => {
  res.send('Bot 24/7 faol holatda ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});

// ⚡️ SERVERNI UXLATMASLIK TIZIMI (Self-Ping)
// Har 10 daqiqada Render serveriga o'zi so'rov yuborib uxlashga qo'ymaydi
setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log('Self-ping muvaffaqiyatli bajarildi');
  }).on('error', (err) => {
    console.error('Self-ping xatosi:', err.message);
  });
}, 10 * 60 * 1000);

// BOT TOKEN
const BOT_TOKEN = '8885536115:AAGok1rkgWhe50fQkSY3hEhglr9V4OVtcQ0';
const bot = new Telegraf(BOT_TOKEN);

// 🎬 1 DAN 100 GACHA KINOLAR BAZASI
const movies = {
  "1": { title: "Qasoskorlar: Intihoy", file_id: "BAACAgIAAxkBAPyaqeA3qLG2VubWF1Lwyx36RKS2SEAAsOgAAJgoEBJv7wYX02X4GQ9BA" },
  "2": { title: "Ferdinand multfilmi", file_id: "BAACAgIAAxkBAAIBjGqnlyQ9xPPIDZPJPwI7k6LbYCGiAAK0oQACYKBASabLP9GxaMccPQQ" },
  "3": { title: "Uyda yolgiz 1", file_id: "BAACAgIAAxkBAAIB4mqnslmXGBMOwI0ZE0CLLE8CMCUUAAL4ogACYKBASWebCYjIU02oPQQ" },
  "4": { title: "Uyda yolgiz 2", file_id: "FILE_ID_YAZILADI" },
  "5": { title: "Forsaj 10", file_id: "FILE_ID_YAZILADI" },
  "6": { title: "Garri Poter 1", file_id: "FILE_ID_YAZILADI" },
  "7": { title: "Avatar 2", file_id: "FILE_ID_YAZILADI" },
  "8": { title: "Orgimchak odam", file_id: "FILE_ID_YAZILADI" },
  "9": { title: "Titanik", file_id: "FILE_ID_YAZILADI" },
  "10": { title: "Meteora", file_id: "FILE_ID_YAZILADI" },
  "11": { title: "Kino nomi 11", file_id: "FILE_ID_YAZILADI" },
  "12": { title: "Kino nomi 12", file_id: "FILE_ID_YAZILADI" },
  "13": { title: "Kino nomi 13", file_id: "FILE_ID_YAZILADI" },
  "14": { title: "Kino nomi 14", file_id: "FILE_ID_YAZILADI" },
  "15": { title: "Kino nomi 15", file_id: "FILE_ID_YAZILADI" },
  "16": { title: "Kino nomi 16", file_id: "FILE_ID_YAZILADI" },
  "17": { title: "Kino nomi 17", file_id: "FILE_ID_YAZILADI" },
  "18": { title: "Kino nomi 18", file_id: "FILE_ID_YAZILADI" },
  "19": { title: "Kino nomi 19", file_id: "FILE_ID_YAZILADI" },
  "20": { title: "Kino nomi 20", file_id: "FILE_ID_YAZILADI" },
  "21": { title: "Kino nomi 21", file_id: "FILE_ID_YAZILADI" },
  "22": { title: "Kino nomi 22", file_id: "FILE_ID_YAZILADI" },
  "23": { title: "Kino nomi 23", file_id: "FILE_ID_YAZILADI" },
  "24": { title: "Kino nomi 24", file_id: "FILE_ID_YAZILADI" },
  "25": { title: "Kino nomi 25", file_id: "FILE_ID_YAZILADI" },
  "26": { title: "Kino nomi 26", file_id: "FILE_ID_YAZILADI" },
  "27": { title: "Kino nomi 27", file_id: "FILE_ID_YAZILADI" },
  "28": { title: "Kino nomi 28", file_id: "FILE_ID_YAZILADI" },
  "29": { title: "Kino nomi 29", file_id: "FILE_ID_YAZILADI" },
  "30": { title: "Kino nomi 30", file_id: "FILE_ID_YAZILADI" },
  "31": { title: "Kino nomi 31", file_id: "FILE_ID_YAZILADI" },
  "32": { title: "Kino nomi 32", file_id: "FILE_ID_YAZILADI" },
  "33": { title: "Kino nomi 33", file_id: "FILE_ID_YAZILADI" },
  "34": { title: "Kino nomi 34", file_id: "FILE_ID_YAZILADI" },
  "35": { title: "Kino nomi 35", file_id: "FILE_ID_YAZILADI" },
  "36": { title: "Kino nomi 36", file_id: "FILE_ID_YAZILADI" },
  "37": { title: "Kino nomi 37", file_id: "FILE_ID_YAZILADI" },
  "38": { title: "Kino nomi 38", file_id: "FILE_ID_YAZILADI" },
  "39": { title: "Kino nomi 39", file_id: "FILE_ID_YAZILADI" },
  "40": { title: "Kino nomi 40", file_id: "FILE_ID_YAZILADI" },
  "41": { title: "Kino nomi 41", file_id: "FILE_ID_YAZILADI" },
  "42": { title: "Kino nomi 42", file_id: "FILE_ID_YAZILADI" },
  "43": { title: "Kino nomi 43", file_id: "FILE_ID_YAZILADI" },
  "44": { title: "Kino nomi 44", file_id: "FILE_ID_YAZILADI" },
  "45": { title: "Kino nomi 45", file_id: "FILE_ID_YAZILADI" },
  "46": { title: "Kino nomi 46", file_id: "FILE_ID_YAZILADI" },
  "47": { title: "Kino nomi 47", file_id: "FILE_ID_YAZILADI" },
  "48": { title: "Kino nomi 48", file_id: "FILE_ID_YAZILADI" },
  "49": { title: "Kino nomi 49", file_id: "FILE_ID_YAZILADI" },
  "50": { title: "Kino nomi 50", file_id: "FILE_ID_YAZILADI" },
  "51": { title: "Kino nomi 51", file_id: "FILE_ID_YAZILADI" },
  "52": { title: "Kino nomi 52", file_id: "FILE_ID_YAZILADI" },
  "53": { title: "Kino nomi 53", file_id: "FILE_ID_YAZILADI" },
  "54": { title: "Kino nomi 54", file_id: "FILE_ID_YAZILADI" },
  "55": { title: "Kino nomi 55", file_id: "FILE_ID_YAZILADI" },
  "56": { title: "Kino nomi 56", file_id: "FILE_ID_YAZILADI" },
  "57": { title: "Kino nomi 57", file_id: "FILE_ID_YAZILADI" },
  "58": { title: "Kino nomi 58", file_id: "FILE_ID_YAZILADI" },
  "59": { title: "Kino nomi 59", file_id: "FILE_ID_YAZILADI" },
  "60": { title: "Kino nomi 60", file_id: "FILE_ID_YAZILADI" },
  "61": { title: "Kino nomi 61", file_id: "FILE_ID_YAZILADI" },
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

// /start buyrug'i
bot.start((ctx) => {
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 2, 3,)');
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
