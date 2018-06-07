import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ComidaService } from '../servicios/comida.service';
import { COMIDA_SCHEMA } from '../comida/comida.schema';
import { ValidationPipe } from '../pipes/validation.pipe';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

@Controller('Comida')

export class ComidaController {

  constructor(private _comidaService: ComidaService) {}

  @Get()
  listarTodos(
    @Res() response
  ) {

    const comidas = this._comidaService.listarComidas();

    if (comidas.length === 0) {
      throw new NotFoundException(
        {
          mensaje: 'No se ha encontrado registro de comida alguno.'
        },
        10
      );
    } else {
      return response.send(comidas);
    }
  }

  @Post()
  crearComida(
    @Body(new ValidationPipe(COMIDA_SCHEMA)) bodyParams,
    @Res() response
  ){

    const nuevaComida = {
      idPlato: bodyParams.idPlato,
      nombrePlato: bodyParams.nombrePlato,
      descripcionPlato: bodyParams.descripcionPlato,
      nacionalidad: bodyParams.nacionalidad,
      numeroPersonas: bodyParams.numeroPersonas,
      picante: bodyParams.picante
    };

    const comidaCreada = this._comidaService.crearComida(nuevaComida);

    if (!comidaCreada) {
      throw new BadRequestException(
        {
          mensaje: 'No se pudo insertar el registro. Por favor verifique la entrada.'
        },
        10
      );
    } else {
      return response.send(comidaCreada);
    }

  }

  @Get('/:idComida')
  obtenerUno(
    @Res() response,
    @Param('idComida') idComida
  ) {

    const comida = this._comidaService.buscarComida(idComida);

    if (!comida) {
      throw new NotFoundException(
        {
          mensaje: 'No se ha encontrado el registro con identificador' + idComida +'.'
        },
        10
      );
    } else {
      return response.send(comida);
    }

  }

  @Put('/:idComida')
  editarUno(
    @Body(new ValidationPipe(COMIDA_SCHEMA)) bodyParams,
    @Param('idComida') idComida,
    @Res() response
  ) {

    const indiceComida = this._comidaService
      .buscarIndiceComida(idComida);

    const comidaActualizada = {
      idPlato: bodyParams.idPlato,
      nombrePlato: bodyParams.nombrePlato,
      descripcionPlato: bodyParams.descripcionPlato,
      nacionalidad: bodyParams.nacionalidad,
      numeroPersonas: bodyParams.numeroPersonas,
      picante: bodyParams.picante
    };

    const comida = this._comidaService
      .actualizarComida(
        indiceComida,
        comidaActualizada);

    if (!comida) {
      throw new BadRequestException(
        {
          mensaje: 'No se pudo actualizar el registro. Por favor verifique la entrada.'
        },
        10
      );
    } else {
      return response.send(comida);
    }
  }
}