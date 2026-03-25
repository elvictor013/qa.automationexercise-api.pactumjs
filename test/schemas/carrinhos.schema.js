const Joi = require('joi')

const cadastroCarrinhoSchema = Joi.object({
  message: Joi.string().required(),
  _id:     Joi.string().required(),
})

const listaCarrinhosSchema = Joi.object({
  quantidade: Joi.number().required(),
  carrinhos:  Joi.array().items(
    Joi.object({
      produtos:        Joi.array().required(),
      precoTotal:      Joi.number().required(),
      quantidadeTotal: Joi.number().required(),
      idUsuario:       Joi.string().required(),
      _id:             Joi.string().required(),
    })
  ).required(),
})

const carrinhoPorIdSchema = Joi.object({
  produtos:        Joi.array().required(),
  precoTotal:      Joi.number().required(),
  quantidadeTotal: Joi.number().required(),
  idUsuario:       Joi.string().required(),
  _id:             Joi.string().required(),
})

module.exports = { cadastroCarrinhoSchema, listaCarrinhosSchema, carrinhoPorIdSchema }