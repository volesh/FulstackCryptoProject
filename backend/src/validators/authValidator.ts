import * as Joi from 'joi';
import { regexpEnum } from '../constants';

export const authValidator = {
    loginValidator: Joi.object({
        email: Joi.string()
            .trim()
            .lowercase()
            .regex(regexpEnum.EMAIL)
            .required(),
        password: Joi.string().trim().regex(regexpEnum.PASSWORD).required(),
    })
};
