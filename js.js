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

// MAJBURIY GURUH / KANAL
const CHANNEL_ID = '-1002094929519';
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
    
    // Faqat shu statuslarda bo'lsagina true qaytaradi (a'zo, admin, creator)
    if (['creator', 'administrator', 'member'].includes(member.status)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Obuna tekshirishda xatolik:', error.message);
    // Xatolik yuz bersa HAM false qaytaradi, ya'ni videoni yubormaydi!
    return false; 
  }
}

// /start buyrug'i
bot.start((ctx) => {
  ctx.reply('🍿 Kino botga xush kelibsiz!\n\nKino kodini yuboring (Masalan: 69)');
});

// Xabar kelganda
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
      // Obuna bo'lmagan bo'lsa FAQAT shu tugmalarni chiqaradi!
      await ctx.reply(
        `⚠️ Kinoni ko'rish uchun avval guruhimizga obuna bo'ling!`,
        Markup.inlineKeyboard([
          [Markup.button.url('📢 Guruhga qo\'shilish', CHANNEL_LINK)],
          [Markup.button.callback('✅ Obunani tekshirish', `check_${text}`)]
        ])
      );
    }
  } else {
    await ctx.reply('❌ Bunday kodli kino topilmadi.');
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
    await ctx.answerCbQuery('❌ Siz hali guruhga qo\'shilmadingiz! Avval guruhga a\'zo bo\'ling.', { show_alert: true });
  }
});

bot.launch();
