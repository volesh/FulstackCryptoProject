import * as Joi from 'joi';
import { regexpEnum } from '../constants';

export const userValidator = {
    newUserValidator: Joi.object({
        name: Joi.string()
            .trim()
            .required()
            .max(50)
            .min(2),
        age: Joi.number().min(15).max(120),
        email: Joi.string()
            .trim()
            .lowercase()
            .regex(regexpEnum.EMAIL)
            .required(),
        password: Joi.string().trim().regex(regexpEnum.PASSWORD).required(),
        phone: Joi.string().trim().regex(regexpEnum.PHONE).required(),
        invested: Joi.number(),
        fixedIncome: Joi.number().default(0)
    }),
    newPasswordValidator: Joi.object({
        newPassword: Joi.string().trim().regex(regexpEnum.PASSWORD).required(),
        oldPassword: Joi.string().required()
    })
};
