const { spec } = require('pactum')
const assert   = require('assert')
const {
  criacaoUsuarioSchema,
  listaUsuariosSchema,
  usuarioPorIdSchema,
} = require('../schemas/usuarios.schema')

describe('Usuários', () => {

  describe('GET /usuarios', () => {

    it('deve listar os usuários cadastrados', async () => {
      const resposta = await spec()
        .get('/usuarios')
        .expectStatus(200)
        .toss()

      assert.ok(resposta.body.quantidade >= 0)
      assert.ok(Array.isArray(resposta.body.usuarios))
    })

    it('deve validar o contrato da listagem de usuários', async () => {
      const resposta = await spec()
        .get('/usuarios')
        .expectStatus(200)
        .toss()

      const { error } = listaUsuariosSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('POST /usuarios', () => {

    it('deve criar um usuário com sucesso', async () => {
      const novoUsuario = {
        nome:          'Usuario Teste',
        email:         `teste.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const resposta = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      assert.strictEqual(resposta.body.message, 'Cadastro realizado com sucesso')
      assert.ok(resposta.body._id)
    })

    it('deve validar o contrato da criação de usuário com sucesso', async () => {
      const novoUsuario = {
        nome:          'Usuario Contrato',
        email:         `contrato.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const resposta = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      const { error } = criacaoUsuarioSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('GET /usuarios/{_id}', () => {

    it('deve buscar um usuário por id com sucesso', async () => {
      const novoUsuario = {
        nome:          'Usuario Busca',
        email:         `busca.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const criacao = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/usuarios/${id}`)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body._id, id)
      assert.ok(resposta.body.nome)
    })

    it('deve validar o contrato da busca de usuário por id', async () => {
      const novoUsuario = {
        nome:          'Usuario Contrato Id',
        email:         `contrato.id.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const criacao = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/usuarios/${id}`)
        .expectStatus(200)
        .toss()

      const { error } = usuarioPorIdSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('PUT /usuarios/{_id}', () => {

    it('deve editar um usuário por id com sucesso', async () => {
      const novoUsuario = {
        nome:          'Usuario Para Editar',
        email:         `editar.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const criacao = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const dadosAtualizados = {
        nome:          'Usuario Editado',
        email:         `editado.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'false',
      }

      const resposta = await spec()
        .put(`/usuarios/${id}`)
        .withJson(dadosAtualizados)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro alterado com sucesso')
    })

  })

  describe('DELETE /usuarios/{_id}', () => {

    it('deve excluir um usuário por id com sucesso', async () => {
      const novoUsuario = {
        nome:          'Usuario Para Deletar',
        email:         `deletar.${Date.now()}@qa.com`,
        password:      'teste123',
        administrador: 'true',
      }

      const criacao = await spec()
        .post('/usuarios')
        .withJson(novoUsuario)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .delete(`/usuarios/${id}`)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro excluído com sucesso')
    })

  })

})