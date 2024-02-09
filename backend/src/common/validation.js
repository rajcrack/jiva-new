// import Joi from "joi";
const Joi = require("joi");
const { CustomError } = require("../common/customError");
function validateRequest(requestData, schema) {
  const { error, value } = schema
    .options({ allowUnknown: true })
    .validate(requestData);
  if (error) {
    throw CustomError(error, 400);
  }
  return value;
}

module.exports = {
  validateRequest
}