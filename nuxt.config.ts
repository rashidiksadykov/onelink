// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    TELEGRAM_TOKEN: process.env.TELEGRAM_BOT_TOKEN
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-telegram-auth']
})