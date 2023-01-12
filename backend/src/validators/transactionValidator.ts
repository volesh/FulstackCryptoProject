import * as Joi from 'joi';

export const transactionValidator = {
    neTransactionValidator: Joi.object({
        _user_id: Joi.string().required(),
        tokenId: Joi.string().trim().lowercase().required(),
        date: Joi.date().required(),
        count: Joi.number().required(),
        price: Joi.number().required(),
        status: Joi.bool().required()
    })
};
