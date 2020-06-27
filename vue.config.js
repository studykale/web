
module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/about',
        '/auth/auth/login',
        '/auth/auth/signup'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    },
    sitemap: {
        productionOnly: true,
        outputDir: 'public',
        pretty: true,
        urls: [
        'https://studykale.com/',
        'https://studykale.cpm/aboutus',
        'https://studykale.cpm/auth/login',
        'https://studykale.cpm/auth/signup',
        ]
    }
  }
}
