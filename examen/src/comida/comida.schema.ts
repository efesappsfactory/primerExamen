import * as Joi from 'joi';

export const COMIDA_SCHEMA = Joi
  .object()
  .keys({
    nombrePlato: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    descripcionPlato: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    nacionalidad: Joi
      .string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    numeroPersonas: Joi
      .number()
      .integer()
      .greater(0)
      .less(10),
    picante: Joi
      .boolean(),
  });