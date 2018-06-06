import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { INGREDIENTES_SCHEMA } from '../ingredientes/ingredientes.schema';
import { IngredientesService } from '../servicios/ingredientes.service';

@Controller('Ingredientes')

export class IngredientesController {

  constructor(private _ingredientesService: IngredientesService) {
  }

  @Get()
  listarTodos(
    @Res() response
  ) {
    const ingredientes = this._ingredientesService.listarIngredientes();
    return response
      .status(200)
      .send(ingredientes);
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

    return response.send(ingredienteCreado);
  }

  @Get('/:idIngrediente')
  obtenerUno(
    @Res() response,
    @Param() paramParams
  ) {
    const ingrediente = this._ingredientesService.buscarIngrediente(paramParams.idIngrediente);
    return response
      .status(200)
      .send(ingrediente);
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

    return response.send(ingrediente);
  }
}