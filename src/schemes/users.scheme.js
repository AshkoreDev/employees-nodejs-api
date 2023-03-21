import Joi from 'joi';

const username = Joi.string().min(3).max(20).messages({
  'string.base': 'The username must be a string',
  'string.min': 'The username must be larger than or equal to 3',
  'string.max': 'The username must be less than or equal to 20'
});

const password = Joi.string().alphanum().min(8).max(20).messages({
  'string.base': 'The password must be a string or an alphanum',
  'string.min': 'The password must be larger than or equal to 8',
  'string.max': 'The password must be less than or equal to 20'
});

const position = Joi.string().min(5).max(20).messages({
  'string.base': 'The position must be a string',
  'string.min': 'The position must be larger than or equal to 5',
  'string.max': 'The position must be less than or equal to 20'
});

export const userCreateScheme = Joi.object({
  username: username.required(),
  password: password.required(),
  position: position.required()
});

export const userUpdateScheme = Joi.object({
  username: username,
  password: password,
  position: position
});