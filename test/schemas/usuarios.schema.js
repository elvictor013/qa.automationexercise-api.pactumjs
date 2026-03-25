const Joi = require('joi')

/**
 * Schema esperado para criação de usuário com sucesso.
 */
const criacaoUsuarioSchema = Joi.object({
  message: Joi.string().required(),
  _id:     Joi.string().required(),
})

/**
 * Schema esperado para listagem de usuários.
 */
const listaUsuariosSchema = Joi.object({
  quantidade: Joi.number().required(),
  usuarios:   Joi.array().items(
    Joi.object({
      nome:          Joi.string().required(),
      email:         Joi.string().required(),
      password:      Joi.string().required(),
      administrador: Joi.string().required(),
      _id:           Joi.string().required(),
    })
  ).required(),
})

/**
 * Schema esperado para busca de usuário por ID.
 */
const usuarioPorIdSchema = Joi.object({
  nome:          Joi.string().required(),
  email:         Joi.string().required(),
  password:      Joi.string().required(),
  administrador: Joi.string().required(),
  _id:           Joi.string().required(),
})

module.exports = { criacaoUsuarioSchema, listaUsuariosSchema, usuarioPorIdSchema }