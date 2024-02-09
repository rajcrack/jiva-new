const Joi = require("joi");

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
});



module.exports = {
    changePasswordSchema
}