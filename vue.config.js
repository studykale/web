
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
        'https://studykale.com/aboutus',
        'https://studykale.com/auth/login',
        'https://studykale.com/auth/signup',
        ]
    }
  }
}
