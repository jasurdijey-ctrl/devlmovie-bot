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

// MAJBURIY KANAL SOZLAMALARI
const CHANNEL_ID = '@fargona_somsa_xamirlari'; // Kanalizatsiyangiz username'ini yozing (masalan: @my_channel)
const CHANNEL_LINK = 'https://t.me/fargona_somsa_xamirlari'; // Kanalingiz havolasi

// Kinolar bazasi
const movies = {
  "1": {
    title: "Qasoskorlar: Intihoy",
    file_id: "BAACAgIAAxkBAAMXaqbNpPiGvhqmEXUaj1raK_m8h7cAAn2rAAJgoDhJYTsBK8W2c8Y9BA"
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
    return ['creator', 'administrator', 'member'].includes(member.status);
  } catch (error) {
    console.error('Obuna tekshirishda xatolik:', error);
    return false;
  }
}

// Raqam (kino kodi) yozilganda
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const userId = ctx.from.id;

  // Agar faqat raqam yuborilgan bo'lsa
  if (movies[text]) {
    const isSubscribed = await checkSubscription(ctx, userId);

    if (isSubscribed) {
      // Obuna bo'lgan bo'lsa - kinoni yuboradi
      await ctx.replyWithVideo(movies[text].file_id, {
        caption: `🍿 <b>${movies[text].title}</b>`,
        parse_mode: 'HTML'
      });
    } else {
      // Obuna bo'lmagan bo'lsa - tugma chiqaradi
      await ctx.reply(
        `⚠️ Kinoni ko'rish uchun avval kanalimizga obuna bo'ling!`,
        Markup.inlineKeyboard([
          [Markup.button.url('📢 Kanalga obuna bo\'lish', CHANNEL_LINK)],
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
    await ctx.deleteMessage(); // Tugmali xabarni o'chirib tashlaydi
    
    if (movies[movieCode]) {
      await ctx.replyWithVideo(movies[movieCode].file_id, {
        caption: `🍿 <b>${movies[movieCode].title}</b>`,
        parse_mode: 'HTML'
      });
    }
  } else {
    await ctx.answerCbQuery('❌ Siz hali kanalga obuna bo\'lmadingiz!', { show_alert: true });
  }
});

bot.launch();
