const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().min(3).email().required(),

  password: Joi.string().min(3).required(),
});



module.exports = {
  loginSchema
}