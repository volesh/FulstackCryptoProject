import Joi from 'joi';
import { regexpEnum } from '../configs';

export const registerValidator = Joi.object({
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
    repeatPassword: Joi.ref('password'),
    phone: Joi.string().trim().regex(regexpEnum.PHONE).required(),

});
