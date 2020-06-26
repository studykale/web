module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/about',
        '/auth/login',
        '/auth/signup'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
