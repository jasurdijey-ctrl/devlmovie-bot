const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot 24/7 ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});

const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8885536115:AAG-CihCUvut-hZgBLO81cUBpOmhYQ4EMo';
const bot = new Telegraf(BOT_TOKEN);

// 🔹 TEKSHIRILADIGAN KANALLAR RO'YXATI
// (Xohlagancha kanal qo'shishingiz mumkin)
const CHANNELS = [
  { id: '@fargona_somsa_xamirlari', name: '1 - kanal', link: 'https://t.me/fargona_somsa_xamirlari' },
  // Keyinchalik boshqa kanallar bo'lsa pastidan qo'shasiz:
  // { id: '@ikkinchi_kanal', name: '2 - kanal', link: 'https://t.me/ikkinchi_kanal' }
];

// Kinolar bazasi
const movies = {
  "1": {
    title: "Qasoskorlar: Intihoy",
    file_id: "BAACAgIAAxkBAPyaqeA3qLG2VubWF1Lwyx36RKS2SEAAsOgAAJgoEBJv7wYX02X4GQ9BA"
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

// Barcha kanallarga obunani tekshirish funksiyasi
async function checkAllSubscriptions(ctx, userId) {
  for (const ch of CHANNELS) {
    try {
      const member = await ctx.telegram.getChatMember(ch.id, userId);
      if (['left', 'kicked'].includes(member.status)) {
        return false; // Agar bittasidan bo'lsa ham chiqqan bo'lsa, false beradi
      }
    } catch (error) {
      console.error(`Obuna tekshirishda xatolik (${ch.id}):`, error.message);
      return false; // Xatolik bo'lsa ham obunasiz deb hisoblaydi
    }
  }
  return true;
}

// Tugmalarni yasovchi funksiya (Rasmdagidek chiqishi uchun)
function getSubscriptionKeyboard(movieCode) {
  const buttons = CHANNELS.map(ch => [Markup.button.url(ch.name, ch.link)]);
  
  // Pastiga "✅ Tasdiqlash" tugmasini qo'shamiz
  buttons.push([Markup.button.callback('✅ Tasdiqlash', `check_${movieCode}`)]);

  return Markup.inlineKeyboard(buttons);
}

// Ogohlantirish matni (Rasmdagi matn)
const warningText = `❌ Kechirasiz, botimizdan foydalanish uchun ushbu kanallarga obuna bo'lishingiz kerak.

💎 Yoki «PREMIUM» obunasini sotib oling va botdan hech qanday kanallarga obuna bo'lmasdan cheklovlarsiz foydalaning!`;

// /start buyrug'i uchun
bot.start((ctx) => {
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 69)');
});

// Kino kodi yozilganda
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const userId = ctx.from.id;

  if (text.startsWith('/')) return;

  if (movies[text]) {
    const isSubscribed = await checkAllSubscriptions(ctx, userId);

    if (isSubscribed) {
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🍿 <b>${movies[text].title}</b>`,
        parse_mode: 'HTML'
      });
    } else {
      await ctx.reply(warningText, getSubscriptionKeyboard(text));
    }
  } else {
    await ctx.reply('❌ Bunday kodli kino topilmadi.');
  }
});

// "✅ Tasdiqlash" tugmasi bosilganda
bot.action(/^check_(.+)$/, async (ctx) => {
  const movieCode = ctx.match[1];
  const userId = ctx.from.id;

  const isSubscribed = await checkAllSubscriptions(ctx, userId);

  if (isSubscribed) {
    await ctx.answerCbQuery('✅ Obuna tasdiqlandi!');
    try { await ctx.deleteMessage(); } catch (e) {}

    if (movies[movieCode]) {
      await ctx.replyWithVideo(movies[movieCode].file_id, {
        caption: `🍿 <b>${movies[movieCode].title}</b>`,
        parse_mode: 'HTML'
      });
    }
  } else {
    await ctx.answerCbQuery('❌ Siz hali barcha kanallarga obuna bo\'lmadingiz!', { show_alert: true });
  }
});

bot.launch();
