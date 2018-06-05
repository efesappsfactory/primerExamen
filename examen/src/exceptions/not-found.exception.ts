import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException{

  constructor(private readonly _mensaje,
              private readonly _nivelError) {
    super({
      mensaje: 'Recurso no encontrado. Por favor verifique.',
      statusCode: HttpStatus.NOT_FOUND,
      nivelError: _nivelError,
      detalle: _mensaje,
    }, HttpStatus.NOT_FOUND);
  }
}