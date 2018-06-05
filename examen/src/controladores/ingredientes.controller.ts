import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ComidaPipe } from '../pipes/comida.pipe';
import { INGREDIENTES_SCHEMA } from '../ingredientes/ingredientes.schema';
import { IngredientesService } from '../servicios/ingredientes.service';

@Controller('Ingredientes')

export class IngredientesController {

  constructor(private _ingredientesService: IngredientesService) {}

  @Get()
  listarTodos(
    @Res() response
  ){
    const ingredientes = this._ingredientesService.listarIngredientes();
    return response
      .status(200)
      .send(ingredientes);
  }

  @Post()
  crearIngredientes(
    @Body(new ComidaPipe(INGREDIENTES_SCHEMA)) bodyParams,
    @Res() response
  ){
    const nuevoIngrediente = {
      idIngrediente: bodyParams.idIngrediente,
      nombreIngrediente: bodyParams.nombreIngrediente,
      cantidad: bodyParams.cantidad,
      descripcionPreparacion: bodyParams.descripcionPreparacion,
      opcional: bodyParams.opcional,
      tipoIngrediente: bodyParams.tipoIngrediente,
      necesitaRefrigeracion: bodyParams.necesitaRefrigeracion
    };

    const ingredienteCreado = this._ingredientesService.crearIngrediente(nuevoIngrediente);
    return response.send(ingredienteCreado);
  }

  @Get('/:idIngrediente')
  obtenerUno(
    @Res() response,
    @Param() paramParams
  ){
    const ingrediente = this._ingredientesService.buscarIngrediente(paramParams.idIngrediente);
    return response
      .status(200)
      .send(ingrediente);
  }
}