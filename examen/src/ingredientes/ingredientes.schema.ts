import * as Joi from 'joi';

export const INGREDIENTES_SCHEMA = Joi
  .object()
  .keys({
    idIngrediente: Joi
      .string()
      .required(),
    nombreIngrediente: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    descripcionPreparacion: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    tipoIngrediente: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    cantidad: Joi
      .number()
      .integer()
      .greater(0)
      .less(10),
  });