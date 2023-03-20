import Joi from 'joi';

export const employeeCreateScheme = Joi.object({

  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  gender: Joi.string().required(),
  nationality: Joi.string().required(),
  dni: Joi.string().required(),
  telephone: Joi.string().optional(),
  email: Joi.string().optional(),
  address: Joi.string().optional()
});

export const employeeUpdateScheme = Joi.object({

  first_name: Joi.string(),
  last_name: Joi.string(),
  date_of_birth: Joi.string(),
  gender: Joi.string(),
  nationality: Joi.string(),
  dni: Joi.string(),
  telephone: Joi.string(),
  email: Joi.string(),
  address: Joi.string()
});