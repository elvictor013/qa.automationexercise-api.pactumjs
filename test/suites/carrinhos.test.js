const { spec } = require('pactum')
const assert   = require('assert')
const {
  cadastroCarrinhoSchema,
  listaCarrinhosSchema,
  carrinhoPorIdSchema,
} = require('../schemas/carrinhos.schema')

const criarUsuarioEObterTokenEProduto = async () => {
  const novoUsuario = {
    nome:          'Usuario Carrinho',
    email:         `carrinho.${Date.now()}@qa.com`,
    password:      'teste123',
    administrador: 'true',
  }

  await spec()
    .post('/usuarios')
    .withJson(novoUsuario)
    .expectStatus(201)
    .toss()

  const login = await spec()
    .post('/login')
    .withJson({ email: novoUsuario.email, password: novoUsuario.password })
    .expectStatus(200)
    .toss()

  const token = login.body.authorization

  const novoProduto = {
    nome:       `Produto Carrinho ${Date.now()}`,
    preco:      100,
    descricao:  'Produto para teste de carrinho',
    quantidade: 50,
  }

  const produto = await spec()
    .post('/produtos')
    .withHeaders('Authorization', token)
    .withJson(novoProduto)
    .expectStatus(201)
    .toss()

  return { token, idProduto: produto.body._id }
}

describe('Carrinhos', () => {

  describe('GET /carrinhos', () => {

    it('deve listar os carrinhos cadastrados', async () => {
      const resposta = await spec()
        .get('/carrinhos')
        .expectStatus(200)
        .toss()

      assert.ok(resposta.body.quantidade >= 0)
      assert.ok(Array.isArray(resposta.body.carrinhos))
    })

    it('deve validar o contrato da listagem de carrinhos', async () => {
      const resposta = await spec()
        .get('/carrinhos')
        .expectStatus(200)
        .toss()

      const { error } = listaCarrinhosSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('POST /carrinhos', () => {

    it('deve cadastrar um carrinho com sucesso', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      const resposta = await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      assert.strictEqual(resposta.body.message, 'Cadastro realizado com sucesso')
      assert.ok(resposta.body._id)

      await spec()
        .delete('/carrinhos/cancelar-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()
    })

    it('deve validar o contrato do cadastro de carrinho com sucesso', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      const resposta = await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      const { error } = cadastroCarrinhoSchema.validate(resposta.body)
      assert.ifError(error)

      await spec()
        .delete('/carrinhos/cancelar-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()
    })

  })

  describe('GET /carrinhos/{_id}', () => {

    it('deve buscar um carrinho por id com sucesso', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      const criacao = await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/carrinhos/${id}`)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body._id, id)
      assert.ok(Array.isArray(resposta.body.produtos))

      await spec()
        .delete('/carrinhos/cancelar-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()
    })

    it('deve validar o contrato da busca de carrinho por id', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      const criacao = await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/carrinhos/${id}`)
        .expectStatus(200)
        .toss()

      const { error } = carrinhoPorIdSchema.validate(resposta.body)
      assert.ifError(error)

      await spec()
        .delete('/carrinhos/cancelar-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()
    })

  })

  describe('DELETE /carrinhos/concluir-compra', () => {

    it('deve concluir a compra e excluir o carrinho com sucesso', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      const resposta = await spec()
        .delete('/carrinhos/concluir-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro excluído com sucesso')
    })

  })

  describe('DELETE /carrinhos/cancelar-compra', () => {

    it('deve cancelar a compra e repor o estoque com sucesso', async () => {
      const { token, idProduto } = await criarUsuarioEObterTokenEProduto()

      await spec()
        .post('/carrinhos')
        .withHeaders('Authorization', token)
        .withJson({ produtos: [{ idProduto, quantidade: 1 }] })
        .expectStatus(201)
        .toss()

      const resposta = await spec()
        .delete('/carrinhos/cancelar-compra')
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
    })

  })

})