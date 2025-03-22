// https://nuxt.com/docs/api/configuration/nuxt-config
export default{
  compatibilityDate: '2024-11-01',
  target: 'static',
  generate:{
    fallback: false
  },
  devtools: { enabled: true },
  modules:['@nuxt/ui'],
  nitro:{
    experimental:{
        websocket: true
    }
  }
}