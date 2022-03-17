import * as Joi from 'joi';

export default {
  create: {
    payload: {
      content: Joi.string().required(),
    },
    options: {
      allowUnknown: true,
    },
  },
  updateById: {
    params: {
      id: Joi.string().required(),
    },
    payload: {
      content: Joi.string().required(),
    },
    options: {
      allowUnknown: true,
    },
  },
  getById: {
    params: {
      id: Joi.string().required(),
    },
    options: {
      allowUnknown: true,
    },
  },
  deleteById: {
    params: {
      id: Joi.string().required(),
    },
    options: {
      allowUnknown: true,
    },
  },
};
