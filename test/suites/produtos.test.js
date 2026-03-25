const { spec } = require('pactum')
const assert   = require('assert')
const {
  cadastroProdutoSchema,
  listaProdutosSchema,
  produtoPorIdSchema,
} = require('../schemas/produtos.schema')

const obterToken = async () => {
  const login = await spec()
    .post('/login')
    .withJson({ email: 'fulano@qa.com', password: 'teste' })
    .expectStatus(200)
    .toss()
  return login.body.authorization
}

describe('Produtos', () => {

  describe('GET /produtos', () => {

    it('deve listar os produtos cadastrados', async () => {
      const resposta = await spec()
        .get('/produtos')
        .expectStatus(200)
        .toss()

      assert.ok(resposta.body.quantidade >= 0)
      assert.ok(Array.isArray(resposta.body.produtos))
    })

    it('deve validar o contrato da listagem de produtos', async () => {
      const resposta = await spec()
        .get('/produtos')
        .expectStatus(200)
        .toss()

      const { error } = listaProdutosSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('POST /produtos', () => {

    it('deve cadastrar um produto com sucesso', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto ${Date.now()}`,
        preco:      100,
        descricao:  'Produto criado via teste automatizado',
        quantidade: 50,
      }

      const resposta = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      assert.strictEqual(resposta.body.message, 'Cadastro realizado com sucesso')
      assert.ok(resposta.body._id)
    })

    it('deve validar o contrato do cadastro de produto com sucesso', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto Contrato ${Date.now()}`,
        preco:      200,
        descricao:  'Produto para validação de contrato',
        quantidade: 10,
      }

      const resposta = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      const { error } = cadastroProdutoSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('GET /produtos/{_id}', () => {

    it('deve buscar um produto por id com sucesso', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto Busca ${Date.now()}`,
        preco:      300,
        descricao:  'Produto para busca por id',
        quantidade: 5,
      }

      const criacao = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/produtos/${id}`)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body._id, id)
      assert.ok(resposta.body.nome)
    })

    it('deve validar o contrato da busca de produto por id', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto Contrato Id ${Date.now()}`,
        preco:      400,
        descricao:  'Produto para validação de contrato por id',
        quantidade: 8,
      }

      const criacao = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .get(`/produtos/${id}`)
        .expectStatus(200)
        .toss()

      const { error } = produtoPorIdSchema.validate(resposta.body)
      assert.ifError(error)
    })

  })

  describe('PUT /produtos/{_id}', () => {

    it('deve editar um produto por id com sucesso', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto Para Editar ${Date.now()}`,
        preco:      500,
        descricao:  'Produto para edição',
        quantidade: 20,
      }

      const criacao = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const dadosAtualizados = {
        nome:       `Produto Editado ${Date.now()}`,
        preco:      600,
        descricao:  'Produto editado via teste',
        quantidade: 30,
      }

      const resposta = await spec()
        .put(`/produtos/${id}`)
        .withHeaders('Authorization', token)
        .withJson(dadosAtualizados)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro alterado com sucesso')
    })

  })

  describe('DELETE /produtos/{_id}', () => {

    it('deve excluir um produto por id com sucesso', async () => {
      const token = await obterToken()

      const novoProduto = {
        nome:       `Produto Para Deletar ${Date.now()}`,
        preco:      700,
        descricao:  'Produto para exclusão',
        quantidade: 15,
      }

      const criacao = await spec()
        .post('/produtos')
        .withHeaders('Authorization', token)
        .withJson(novoProduto)
        .expectStatus(201)
        .toss()

      const id = criacao.body._id

      const resposta = await spec()
        .delete(`/produtos/${id}`)
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .toss()

      assert.strictEqual(resposta.body.message, 'Registro excluído com sucesso')
    })

  })

})