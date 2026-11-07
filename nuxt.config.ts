import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4110/api', siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3300' } },
  app: { head: { title: 'Vomtek Studio', meta: [{ name: 'theme-color', content: '#07100e' }], link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }] } },
  typescript: { strict: true, typeCheck: false },
})
