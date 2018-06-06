import { Body, Controller, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ComidaService } from '../servicios/comida.service';
import { COMIDA_SCHEMA } from '../comida/comida.schema';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('Comida')

export class ComidaController {

  constructor(private _comidaService: ComidaService) {}

  @Get()
  listarTodos(
    @Res() response
  ) {
    const comidas = this._comidaService.listarComidas();
    return response
      .status(200)
      .send(comidas);
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

    return response.send(comidaCreada);
  }

  @Get('/:idComida')
  obtenerUno(
    @Res() response,
    @Param('idComida') idComida
  ) {

    const comida = this._comidaService.buscarComida(idComida);

    return response
      .status(200)
      .send(comida);
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

    return response.send(comida);
  }
}