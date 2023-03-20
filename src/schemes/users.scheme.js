import Joi from 'joi';

export const userCreateScheme = Joi.object({

  username: Joi.string().required(), 
  password: Joi.string().required(), 
  role: Joi.string().required()
});

export const userUpdateScheme = Joi.object({

  username: Joi.string().optional(), 
  password: Joi.string().optional(), 
  role: Joi.string().optional()
});