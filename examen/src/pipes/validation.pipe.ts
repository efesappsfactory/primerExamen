import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '../exceptions/bad-request.exception';
import * as Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {

  constructor(private readonly _schema){}

  transform(datosParaValidar: any, metadata: ArgumentMetadata) {

    const {
      error,
    } = Joi.validate(datosParaValidar, this._schema);

    if (error) {
      throw new BadRequestException(
        {
          _error: error,
          mensaje: 'El registro ingresado no cumple con la sintaxis.',
        },
        10,
      );
    } else {
      return datosParaValidar;
    }
  }

}