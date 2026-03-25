const { spec } = require('pactum')
const assert   = require('assert')
const { loginSucessoSchema } = require('../schemas/login.schema')

describe('Login', () => {

  describe('POST /login', () => {

    it('deve realizar login com sucesso', async () => {
      // Arrange
      const credenciais = {
        email: 'fulano@qa.com',
        password: 'teste'
      }

      // Act
      const resposta = await spec()
        .post('/login')
        .withJson(credenciais)
        .expectStatus(200)
        .toss()

      // Assert
      assert.strictEqual(resposta.body.message, 'Login realizado com sucesso')
      assert.ok(resposta.body.authorization)
    })

    it('deve validar o contrato do login com sucesso', async () => {
      // Arrange
      const credenciais = {
        email: 'fulano@qa.com',
        password: 'teste'
      }

      // Act
      const resposta = await spec()
        .post('/login')
        .withJson(credenciais)
        .expectStatus(200)
        .toss()

      // Assert
      const { error } = loginSucessoSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

})