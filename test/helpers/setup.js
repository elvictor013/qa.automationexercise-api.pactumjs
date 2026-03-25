const { request } = require('pactum')

/**
 * Configuração global do PactumJS.
 * Define a URL base para todas as requisições dos testes.
 */
request.setBaseUrl('https://serverest.dev')