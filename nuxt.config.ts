// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    TELEGRAM_TOKEN: process.env.TELEGRAM_BOT_TOKEN
  },

  compatibilityDate: '2024-11-15',
  devtools: { enabled: true },
  modules: ['nuxt-telegram-auth'],

  

  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})







