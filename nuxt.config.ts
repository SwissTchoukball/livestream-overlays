// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
    },
  },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
});
