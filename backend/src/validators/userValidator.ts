import * as Joi from 'joi';

export const userValidator = {
    newUserValidator: Joi.object({
        name: Joi.string()
            .trim()
            .required()
            .max(50)
            .min(2),
        age: Joi.number().min(15).max(120).required(),
        email: Joi.string().trim().lowercase().required(),
        password: Joi.string().trim().required(),
        phone: Joi.string().trim().required(),
        invested: Joi.number().default(0).required()
    })
};
