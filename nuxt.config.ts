// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@huntersofbook/naive-ui-nuxt'
  ],
  auth: {
    isEnabled: true,
    origin: 'http://localhost:3000',
    basePath: '/api/auth',
    enableSessionRefreshPeriodically: false,
    enableSessionRefreshOnWindowFocus: true,
    enableGlobalAppMiddleware: false,
    defaultProvider: undefined,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true
    }
  },
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  typescript: {
    shim: false
  }
})
