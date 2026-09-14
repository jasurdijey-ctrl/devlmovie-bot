const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot 24/7 ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
const { Telegraf } = require('telegraf');


const BOT_TOKEN = '8885536115:AAG-CihCUVuvt-hZgBLO8lcUBpOmhYQ4EMo';
const bot = new Telegraf(BOT_TOKEN);

// Kinolar bazasi
const movies = {
  "1": {
    title: "Qasoskorlar: Intihoy",
    file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA" // file_id nusxalab qo'yiladi
  },
  "69": {
    title: "Ferdinand multfilmi",
    file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA"
  },
  "2": {
    title: "Ferdinand multfilmi",
    file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA"
  }
};



// Start buyrug'i
bot.start((ctx) => {
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 69)');
});

// HAR QANDAY XABAR KELGANDA (Video, Fayl, Rasm va h.k.)
bot.on('message', async (ctx) => {
  const msg = ctx.message;

  // 1. Agar Video kelgan bo'lsa
  if (msg.video) {
    console.log('Video file_id:', msg.video.file_id);
    return ctx.reply(`✅ Video file_id:\n\n<code>${msg.video.file_id}</code>`, { parse_mode: 'HTML' });
  }

  // 2. Agar Fayl (Document) kelgan bo'lsa
  if (msg.document) {
    console.log('Document file_id:', msg.document.file_id);
    return ctx.reply(`✅ Fayl file_id:\n\n<code>${msg.document.file_id}</code>`, { parse_mode: 'HTML' });
  }

  // 3. Agar Matn (Kod) kelgan bo'lsa
  if (msg.text && !msg.text.startsWith('/')) {
    const code = msg.text.trim();
    console.log('Kelgan kod:', code);

    if (movies[code]) {
      const movie = movies[code];
      try {
        await ctx.replyWithVideo(movie.file_id, { caption: `🎬 <b>${movie.title}</b>`, parse_mode: 'HTML' });
      } catch (err) {
        try {
          await ctx.replyWithDocument(movie.file_id, { caption: `🎬 <b>${movie.title}</b>`, parse_mode: 'HTML' });
        } catch (e) {
          ctx.reply(`⚠️ <b>${code}</b>-kino kodi bazada bor, lekin file_id xato yoki qo'yilmagan.`, { parse_mode: 'HTML' });
        }
      }
    } else {
      ctx.reply(`❌ ${code} kodli kino topilmadi.`);
    }
  }
});

// Botni yuritish
bot.launch().then(() => {
  console.log('=== BOT ISHGA TUSHDI VA XABAR KUTYAPTI ===');
}).catch((err) => {
  console.error('Xatolik yuz berdi:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
