// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
