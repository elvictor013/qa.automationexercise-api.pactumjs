const Joi = require('joi')

const cadastroProdutoSchema = Joi.object({
  message: Joi.string().required(),
  _id:     Joi.string().required(),
})

const listaProdutosSchema = Joi.object({
  quantidade: Joi.number().required(),
  produtos:   Joi.array().items(
    Joi.object({
      nome:       Joi.string().required(),
      preco:      Joi.number().required(),
      descricao:  Joi.string().required(),
      quantidade: Joi.number().required(),
      imagem:     Joi.string().allow('').optional(),
      _id:        Joi.string().required(),
    })
  ).required(),
})

const produtoPorIdSchema = Joi.object({
  nome:       Joi.string().required(),
  preco:      Joi.number().required(),
  descricao:  Joi.string().required(),
  quantidade: Joi.number().required(),
  imagem:     Joi.string().allow('').optional(),
  _id:        Joi.string().required(),
})

module.exports = { cadastroProdutoSchema, listaProdutosSchema, produtoPorIdSchema }