const Joi = require('joi')

/**
 * Schema esperado para resposta de login com sucesso.
 * A API retorna a mensagem e o token de autorização.
 */
const loginSucessoSchema = Joi.object({
  message:       Joi.string().required(),
  authorization: Joi.string().required(),
})

module.exports = { loginSucessoSchema }