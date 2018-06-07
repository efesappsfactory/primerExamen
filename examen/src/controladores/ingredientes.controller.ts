import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { INGREDIENTES_SCHEMA } from '../ingredientes/ingredientes.schema';
import { IngredientesService } from '../servicios/ingredientes.service';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

@Controller('Ingredientes')

export class IngredientesController {

  constructor(private _ingredientesService: IngredientesService) {
  }

  @Get()
  listarTodos(
    @Res() response
  ) {
    const ingredientes = this._ingredientesService.listarIngredientes();

    if (ingredientes.length === 0) {
      throw new NotFoundException(
        {
          mensaje: 'No se ha encontrado registro de ingrediente alguno.'
        },
        10
      );
    } else {
      return response.send(ingredientes);
    }

  }

  @Post()
  crearIngredientes(
    @Body(new ValidationPipe(INGREDIENTES_SCHEMA)) bodyParams,
    @Res() response,
  ) {

    const nuevoIngrediente = {
      idIngrediente: bodyParams.idIngrediente,
      nombreIngrediente: bodyParams.nombreIngrediente,
      cantidad: bodyParams.cantidad,
      descripcionPreparacion: bodyParams.descripcionPreparacion,
      opcional: bodyParams.opcional,
      tipoIngrediente: bodyParams.tipoIngrediente,
      necesitaRefrigeracion: bodyParams.necesitaRefrigeracion,
    };

    const ingredienteCreado = this._ingredientesService.crearIngrediente(nuevoIngrediente);

    if (!ingredienteCreado) {
      throw new BadRequestException(
        {
          mensaje: 'No se pudo insertar el registro. Por favor verifique la entrada.'
        },
        10
      );
    } else {
      return response.send(ingredienteCreado);
    }

  }

  @Get('/:idIngrediente')
  obtenerUno(
    @Res() response,
    @Param('idIngrediente') idIngrediente
  ) {

    const ingrediente = this._ingredientesService.buscarIngrediente(idIngrediente);

    if (!ingrediente) {
      throw new NotFoundException(
        {
          mensaje: 'No se ha encontrado el registro con identificador' + idIngrediente +'.'
        },
        10
      );
    } else {
      return response.send(ingrediente);
    }

  }

  @Put('/:idIngrediente')
  editarUno(
    @Body(new ValidationPipe(INGREDIENTES_SCHEMA)) bodyParams,
    @Param('idIngrediente') idIngrediente,
    @Res() response
  ) {

    const indiceIngrediente = this._ingredientesService
      .buscarIndiceIngrediente(idIngrediente);

    const ingredienteActualizado = {
      idIngrediente: bodyParams.idIngrediente,
      nombreIngrediente: bodyParams.nombreIngrediente,
      cantidad: bodyParams.cantidad,
      descripcionPreparacion: bodyParams.descripcionPreparacion,
      opcional: bodyParams.opcional,
      tipoIngrediente: bodyParams.tipoIngrediente,
      necesitaRefrigeracion: bodyParams.necesitaRefrigeracion,
    };

    const ingrediente = this._ingredientesService
      .actualizarIngrediente(
        indiceIngrediente,
        ingredienteActualizado);

    if (!ingrediente) {
      throw new BadRequestException(
        {
          mensaje: 'No se pudo actualizar el registro. Por favor verifique la entrada.'
        },
        10
      );
    } else {
      return response.send(ingrediente);
    }
  }
}