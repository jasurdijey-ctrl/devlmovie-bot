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

// MAJBURIY GURUH SOZLAMALARI
// 🔴 SHU YERGA @raw_data_bot BERGAN -100 BILAN BASHLANADIGAN GURUH ID'SINI YOZING:
const CHANNEL_ID = -  -1002094929519; // <-- bu yerga ozizning gurug'ingiz ID'sini qo'ying
const CHANNEL_LINK = 'https://t.me/fargona_somsa_xamirlari';

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

// Obunani tekshirish funksiyasi
async function checkSubscription(ctx, userId) {
  try {
    const member = await ctx.telegram.getChatMember(CHANNEL_ID, userId);
    console.log(`Foydalanuvchi ${userId} statusi:`, member.status);

    // Agar foydalanuvchi guruhdan chiqqan bo'lsa
    if (['left', 'kicked'].includes(member.status)) {
      return false;
    }

    return ['creator', 'administrator', 'member'].includes(member.status);
  } catch (error) {
    console.error('Obuna tekshirishda xatolik:', error.message);
    return false; // Xatolik bo'lsa ham kinoni ko'rsatmaydi!
  }
}

// /start buyrug'i uchun
bot.start((ctx) => {
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 69)');
});

// Xabar yuborilganda
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const userId = ctx.from.id;

  if (text.startsWith('/')) return;

  if (movies[text]) {
    const isSubscribed = await checkSubscription(ctx, userId);

    if (isSubscribed) {
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🍿 <b>${movies[text].title}</b>`,
        parse_mode: 'HTML'
      });
    } else {
      await ctx.reply(
        `⚠️ Kinoni ko'rish uchun avval guruhimizga obuna bo'ling!`,
        Markup.inlineKeyboard([
          [Markup.button.url('📢 Guruhga qo\'shilish', CHANNEL_LINK)],
          [Markup.button.callback('✅ Obunani tekshirish', `check_${text}`)]
        ])
      );
    }
  }
});

// "Obunani tekshirish" tugmasi bosilganda
bot.action(/^check_(.+)$/, async (ctx) => {
  const movieCode = ctx.match[1];
  const userId = ctx.from.id;

  const isSubscribed = await checkSubscription(ctx, userId);

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
    await ctx.answerCbQuery('❌ Siz hali guruhga qo\'shilmadingiz!', { show_alert: true });
  }
});

bot.launch();
